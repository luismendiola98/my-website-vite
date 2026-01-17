import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Developer from './Developer'
import Resume from './Resume'
import Photography from './Photography'
import About from './About'
import Privacy from './Privacy'
import Error from './Error'
import Navbar from './Navbar'

const ReactRouterSetup = ({ darkMode, onToggleTheme }) => {
  return (
    <Router>
      <Navbar darkMode={darkMode} onToggleTheme={onToggleTheme} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/software-developer' element={<Developer />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/photography' element={<Photography />} />
        <Route path='/about' element={<About />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default ReactRouterSetup
