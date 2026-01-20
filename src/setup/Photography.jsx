import { useEffect, useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

const AUTO_ROTATE_DELAY = 2500
const CACHE_DURATION_DAYS = 7

async function getSession() {
  try {
    const sessionCollectionRef = collection(db, 'sessions')
    const data = await getDocs(sessionCollectionRef)
    let token = ''
    data.docs.forEach((doc) => {
      token = doc.data().id
    })
    return token
  } catch (error) {
    console.error('Error fetching session:', error)
    throw error
  }
}

async function getPosts() {
  try {
    const session = await getSession()
    const headers = { 'Content-Type': 'application/json' }
    const mediaUrl = `https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=${session}`
    
    let response = await fetch(mediaUrl, { headers })
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    let data = await response.json()
    const imageUrls = data.data.map((item) => item.media_url)

    let nextPageUrl = data.paging?.next
    while (nextPageUrl) {
      const nextPageUrlWithFields = nextPageUrl.replace(
        '?',
        '?fields=id,media_type,media_url&'
      )
      
      response = await fetch(nextPageUrlWithFields, { headers })
      if (!response.ok) {
        console.warn('Failed to fetch next page, stopping pagination')
        break
      }

      data = await response.json()
      data.data.forEach((item) => {
        imageUrls.push(item.media_url)
      })
      nextPageUrl = data.paging?.next
    }

    return imageUrls
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw error
  }
}

function getCachedRequestDate() {
  const cachedDate = localStorage.getItem('request_date')
  return cachedDate ? JSON.parse(cachedDate) : null
}

function isCacheExpired(cachedDate) {
  if (!cachedDate) return true
  const expirationDate = new Date(cachedDate)
  expirationDate.setDate(expirationDate.getDate() + CACHE_DURATION_DAYS)
  return expirationDate <= new Date()
}

function getCachedImages() {
  const cached = localStorage.getItem('images')
  return cached ? JSON.parse(cached) : null
}

const Photography = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  const url = images[index]?.url

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const getValidIndex = (number) => {
    if (images.length === 0) return 0
    if (number > images.length - 1) return 0
    if (number < 0) return images.length - 1
    return number
  }

  const nextImage = () => {
    setIndex((prevIndex) => getValidIndex(prevIndex + 1))
  }

  const prevImage = () => {
    setIndex((prevIndex) => getValidIndex(prevIndex - 1))
  }

  // Fetch images on mount
  useEffect(() => {
    async function fetchAndCacheImages() {
      try {
        setIsLoading(true)
        setError(null)

        const cachedDate = getCachedRequestDate()
        let imageUrls = []

        // Check if cache is still valid
        if (!isCacheExpired(cachedDate)) {
          imageUrls = getCachedImages() || []
        }

        // If cache expired or empty, fetch new data
        if (imageUrls.length === 0) {
          imageUrls = await getPosts()
          if (imageUrls.length > 0) {
            const formattedImages = imageUrls.map((url, id) => ({ id, url }))
            localStorage.setItem('images', JSON.stringify(formattedImages))
            localStorage.setItem('request_date', JSON.stringify(Date.now()))
            setImages(formattedImages)
          }
        } else {
          setImages(imageUrls)
        }

        setIsLoading(false)
      } catch (err) {
        console.error('Failed to fetch images:', err)
        setError('Failed to load images. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchAndCacheImages()
    return () => resetTimeout()
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    if (isLoading || error || images.length === 0) return

    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, AUTO_ROTATE_DELAY)

    return () => resetTimeout()
  }, [index, images.length, isLoading, error])

  return (
    <>
      <Helmet>
        <title>LFM | Photography</title>
        <meta
          name='description'
          content='Luis F. Mendiola enjoys taking photographs of landscapes, people, and cars & trucks. If you ever need someone to take your portrait or a picture of your cool vehicle let him know! He is available throughout California to capture your idea in a photo. You can see all his photographs on his Instagram @luiiis_shoots.'
        />
      </Helmet>
      <div>
        <h1>Glimpses of my life...</h1>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2 style={{ color: '#d32f2f' }}>⚠️ {error}</h2>
            <p>Check your connection and try refreshing the page.</p>
          </div>
        ) : images.length === 0 ? (
          <h2>No images available</h2>
        ) : (
          <div className='container'>
            <div className='center'>
              <div className='img-container'>
                <img
                  src={url}
                  alt='Instagram post from @luiiis_shoots'
                  className='person-img'
                />
              </div>
              <div className='button-container'>
                <button className='prev-btn' onClick={prevImage} aria-label='previous image'>
                  <FaChevronLeft />
                </button>
                <button className='next-btn' onClick={nextImage} aria-label='next image'>
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <p>
              In my free time I enjoy taking photos of landscapes, people, and
              cool cars and trucks. I will take a photo of pretty much anything
              that catches my eye. I picked up this hobby through a friend of
              mine that was in a photography class back in highschool. Ever
              since he let me use his Canon EOS Rebel T7, I was hooked! Soon
              thereafter, I bought myself a Canon EOS 80D to continue this new
              hobby of mine.
            </p>

            <p>
              All the images above were either taken by my Canon 80D or by an
              iPhone. If you ever need a picture of yourself or your vehicle,
              please feel free to reach out. I would be more than happy to try
              an capture your idea through a photo. You can also view these
              images on my instagram account{' '}
              <a
                href='https://www.instagram.com/luiiis_shoots'
                target='_blank'
                rel='noreferrer'
              >
                @luiiis_shoots
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default Photography
