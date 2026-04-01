import { Helmet } from 'react-helmet-async'
import Hero from './Hero'
import Stats from './Stats'
import About from './About'
import TechStack from './TechStack'
import TechStackExpertise from './TechStackExpertise'
import Services from './Services'
import Projects from './Projects'
import Process from './Process'
import WhyChooseUs from './WhyChooseUs'
import Contact from './Contact'

const Home = () => {
    return (
        <main>
            <Helmet>
                <title>HA Automations | AI Agency & Workflow Automation</title>
                <meta name="description" content="We help businesses save time and scale with custom AI agents and workflow automations. Book a free consultation today." />
            </Helmet>
            <Hero />
            <Stats />
            <TechStack />
            <About />
            <Process />
            <Services />
            <Projects />
            <TechStackExpertise />
            <WhyChooseUs />
            <Contact />
        </main>
    )
}

export default Home
