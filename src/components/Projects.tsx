
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: "WhatsApp Sales SaaS",
            description: "A rule-based WhatsApp Sales Automation SaaS designed to automate replies, capture leads, and manage products effectively with a comprehensive dashboard.",
            tech: ["React", "Node.js", "WhatsApp API"],
        },
        {
            title: "CreatorFlow",
            description: "AI-powered automation platform with payment integration via Stripe and AI-driven initialization. Optimized for high-performance workflow automation.",
            tech: ["Next.js", "Stripe", "OpenAI"],
        },
        {
            title: "Reply Rocket",
            description: "Specialized programmatic SEO tool with 30+ automated funnel pages and optimized contact forms to boost lead generation efficiency.",
            tech: ["Python", "Automation", "SEO"],
        },
        {
            title: "Shoe Store Ecommerce",
            description: "Modern, full-stack E-commerce application with a functional shopping cart, product catalog, and admin inventory dashboard.",
            tech: ["Next.js", "Tailwind", "Prisma"],
        },
        {
            title: "Autonomous Shutdown Utility",
            description: "Python-based utility for scheduling system-level tasks and computer shutdowns through a clean, intuitive interface.",
            tech: ["Python", "Utility", "System"],
        },
        {
            title: "Experience Form App",
            description: "Interactive web application for capturing and managing user feedback, designed for high engagement and responsiveness.",
            tech: ["React", "UX/UI", "Automation"],
        }
    ];

    return (
        <section id="projects" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-purple-500">Projects</span></h2>
                        <p className="text-gray-400 max-w-xl bg-clip-text">
                            Real-world examples of how we solve complex business problems with intelligent automation.
                        </p>
                    </div>
                    <a href="#" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        View Github <Github className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 min-h-[300px]"
                        >
                            <div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="px-4 py-2 text-sm font-medium rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
