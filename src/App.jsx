import { useState, useEffect } from 'react'
import ReactRouterSetup from './setup/index'
import { Grid, CssBaseline, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { social } from './setup/data'

const getTheme = () => {
  const stored = localStorage.getItem('darkMode')
  return stored ? JSON.parse(stored) : false
}

function App() {
  const [darkMode, setDarkMode] = useState(getTheme())

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiDivider: {
        styleOverrides: {
          root: {
            margin: '20px',
          },
        },
      },
    },
  })

  const handleChange = (e) => {
    setDarkMode(e.target.checked)
  }

  const getYear = () => new Date().getFullYear()

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container direction="column">
        <div>
          <ReactRouterSetup 
            darkMode={darkMode} 
            onToggleTheme={handleChange}
          />
        </div>

        <Divider />

        <div className="footer">
          <div className="contact-info">
            <div>
              <strong>Contact Information</strong>
              <br />
              <a href="mailto:luisfmendiola03@gmail.com">
                <AiOutlineMail aria-label="email icon" />
              </a>
              <a href="tel:7604309060">
                <AiOutlinePhone aria-label="phone icon" />
              </a>
            </div>

            <div>
              <strong>Suggestions</strong>
              <br />
              <a href="mailto:luisfmendiola03@gmail.com">
                <AiOutlineMail aria-label="email icon" />
              </a>
            </div>

            <div>
              <strong>Connect with me</strong>
              <br />
              <ul className="footer-social-icons">
                {social.map(({ id, url, icon }) => (
                  <li key={id}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="social icons"
                    >
                      {icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="center">
            © {getYear()} Luis F. Mendiola
            <br />
            Escondido, CA
            <br />
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  )
}

export default App
