import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Initialize GA with a placeholder. User needs to replace this.
ReactGA.initialize("G-XXXXXXXXXX");

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
