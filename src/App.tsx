
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import TechStackExpertise from './components/TechStackExpertise'
import Services from './components/Services'
import Projects from './components/Projects'
import WhyChooseUs from './components/WhyChooseUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div
      className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30"
    >
      <Navbar />
      <Hero />
      <TechStack />
      <About />
      <Services />
      <Projects />
      <TechStackExpertise />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
