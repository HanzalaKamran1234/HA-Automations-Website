import { Bot, Database, Globe, Cpu, Share2, Users, Plug } from 'lucide-react';
import { motion } from 'framer-motion';

const techStack = [
    {
        icon: <span className="text-3xl">🐍</span>, // Using emoji for accurate Python representation as requested previously
        title: "Python Automation"
    },
    {
        icon: <Share2 className="w-8 h-8 text-cyan-400" />,
        title: "n8n Workflows"
    },
    {
        icon: <Bot className="w-8 h-8 text-cyan-400" />,
        title: "AI Agents"
    },
    {
        icon: <Cpu className="w-8 h-8 text-cyan-400" />,
        title: "OpenAI / LLM APIs"
    },
    {
        icon: <Globe className="w-8 h-8 text-cyan-400" />, // Globe/Spider metaphor
        title: "Web Scraping"
    },
    {
        icon: <Database className="w-8 h-8 text-cyan-400" />,
        title: "Data Processing"
    },
    {
        icon: <Users className="w-8 h-8 text-cyan-400" />,
        title: "CRM Automation"
    },
    {
        icon: <Plug className="w-8 h-8 text-cyan-400" />,
        title: "API Integrations"
    }
];

const TechStackExpertise = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Tech Stack & <span className="text-cyan-400">Expertise</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/50 transition-all group flex flex-col items-center justify-center gap-4 text-center h-[180px]"
                        >
                            <div className="p-3 rounded-xl bg-black/50 group-hover:scale-110 transition-transform duration-300">
                                {tech.icon}
                            </div>
                            <h3 className="font-bold text-lg">{tech.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStackExpertise;
