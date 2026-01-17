import { useEffect, useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'

var urls = []
const delay = 2500

async function getSession() {
  var token = ''
  const sessionCollectionRef = collection(db, 'sessions')
  const data = await getDocs(sessionCollectionRef)
  data.docs.forEach((doc) => {
    token = doc.data().id
  })
  return token
}

async function getPosts() {
  var session = ''
  var next = ''
  var img_urls = []
  session = await getSession()
  const headers = { 'Content-Type': 'application/json' }
  var request = await fetch(
    'https://graph.instagram.com/me/media?fields=id,media_type,media_url&access_token=' +
      session,
    { headers }
  )
  if (request.ok) {
    var response = await request.json()

    // add urls to urls array
    for (var i = 0; i < response.data.length; i++) {
      img_urls[i] = response.data[i].media_url
    }

    next = response.paging.next.replace('?', '?fields=id,media_type,media_url&')

    // while there is a next page get the rest of urls
    // add rest of urls to urls array
    while (next !== '' && next !== undefined) {
      request = await fetch(next, { headers })
      if (request.ok) {
        response = await request.json()
        response.data.forEach((item) => {
          img_urls.push(item.media_url)
        })
        // console.log('urls', urls)
        if (response.paging.next !== undefined) {
          next = response.paging.next.replace(
            '?',
            '?fields=id,media_type,media_url&'
          )
        } else {
          next = undefined
        }
      }
    }
  }
  // console.log(img_urls)
  return img_urls
}

function getRequestDate() {
  let requestDate = localStorage.getItem('request_date')
  if (requestDate) {
    return (requestDate = JSON.parse(localStorage.getItem('request_date')))
  } else {
    return ''
  }
}

function addDays(date, days) {
  var new_date = new Date(date)
  new_date.setDate(new_date.getDate() + days)
  return new_date
}

const Photography = () => {
  const [images, setImages] = useState([{}])
  const [isLoading, setIsLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const { url } = images[index]
  const timeoutRef = useRef(null)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const checkNumber = (number) => {
    if (number > images.length - 1) {
      return 0
    }
    if (number < 0) {
      return images.length - 1
    }
    return number
  }

  const nextImage = () => {
    setIndex((index) => {
      let newIndex = index + 1
      return checkNumber(newIndex)
    })
  }

  const prevImage = () => {
    setIndex((index) => {
      let newIndex = index - 1
      return checkNumber(newIndex)
    })
  }

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    async function fetchData() {
      var request_date = getRequestDate()
      // if request_date is undefined || request_date + 7 days <= Date.now
      // call api and set request_date = Date.now
      if (request_date === '' || addDays(request_date, 7) <= Date.now()) {
        urls = await getPosts()

        if (urls.length !== 0) {
          for (var i = 0; i < urls.length; i++) {
            urls[i] = { id: i, url: urls[i] }
          }
          localStorage.setItem('images', JSON.stringify(urls))
          localStorage.setItem('request_date', Date.now())
        }
      } else {
        // console.log(JSON.parse(localStorage.getItem('images')))
        urls = JSON.parse(localStorage.getItem('images'))
      }
      if (urls.length !== 0) {
        setIsLoading(false)
        setImages([...urls])

        resetTimeout()
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === urls.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        )
      }
    }
    fetchData()
    return () => {
      resetTimeout()
    }
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [index])

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
          <h2>Loading... </h2>
        ) : (
          // images.map((image) => {
          //   const { id, url } = image
          //   return (
          //     <img src={url} key={id} alt='Instagram post from @luiiis_shoots' />
          //   )
          // })
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
                <button className='prev-btn' onClick={prevImage}>
                  <FaChevronLeft aria-label='previous button' />
                </button>
                <button className='next-btn' onClick={nextImage}>
                  <FaChevronRight aria-label='next button' />
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
