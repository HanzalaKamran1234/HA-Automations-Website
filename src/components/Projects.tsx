
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: "AI Lead Generation Agent",
            description: "A fully autonomous agent that finds, qualifies, and contacts potential leads across multiple platforms.",
            tech: ["Python", "n8n", "APIs"],
        },
        {
            title: "Instagram AI Auto-Poster",
            description: "Generates visuals and captions, repurposes content, and schedules posts automatically.",
            tech: ["Python", "Scheduling", "AI Vision"],
        },
        {
            title: "CRM Automation System",
            description: "Automates client follow-ups, pipeline management, and status updates to ensure no lead is lost.",
            tech: ["n8n", "HubSpot", "AI Logic"],
        },
        {
            title: "Email Outreach AI Agent",
            description: "Sends personalized cold emails at scale, tracks replies, and automatically books meeting slots.",
            tech: ["AI NLP", "SMTP", "Automation"],
        },
        {
            title: "Legal Document Analyzer",
            description: "Parses complex legal contracts to identify risks and summarize key clauses using LLMs.",
            tech: ["OpenAI", "React", "Node.js"],
        },
        {
            title: "Voice AI Receptionist",
            description: "Handles inbound calls, books appointments, and syncs with Google Calendar using realistic voice synthesis.",
            tech: ["Vapi", "Python", "Twilio"],
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
