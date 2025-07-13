import './App.css'
import Contact from './Components/Contact'
import Education from './Components/Education'
import Hero from './Components/Hero'
import Navbar from './Components/NavBar'
import Paths from './Components/Paths'
import Projects from './Components/Projects'
import Services from './Components/Services'
import Stats from './Components/Stats'
import Testimonial from './Components/Testimonial'
function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <Services/>
      <Projects/>
      <Paths/>
      <Education/>
      <Testimonial/>
      <Stats/>
      <Contact/>
    </>
  )
}

export default App
