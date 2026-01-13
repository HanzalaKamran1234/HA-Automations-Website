import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Footer from './components/Footer'

import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
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
  )
}

export default App
