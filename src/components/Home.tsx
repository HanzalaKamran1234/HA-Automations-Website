import Hero from './Hero'
import About from './About'
import TechStack from './TechStack'
import TechStackExpertise from './TechStackExpertise'
import Services from './Services'
import Projects from './Projects'
import WhyChooseUs from './WhyChooseUs'
import Contact from './Contact'

const Home = () => {
    return (
        <main>
            <Hero />
            <TechStack />
            <About />
            <Services />
            <Projects />
            <TechStackExpertise />
            <WhyChooseUs />
            <Contact />
        </main>
    )
}

export default Home
