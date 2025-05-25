import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'
import Loader from './components/ui/Loader'
import './App.css'
import WorkEx from './components/sections/WorkEx'

function App() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return <Loader fullScreen/>
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        {/* <Goals /> ← new section */}
        <Projects />
        <WorkEx/>
        {/* <Resume /> */}
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
