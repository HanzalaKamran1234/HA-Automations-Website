
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
    {
        icon: <Search className="w-8 h-8 text-cyan-400" />,
        title: "Discovery & Strategy",
        description: "We analyze your current manual tasks and identify high-impact opportunities for AI and automation."
    },
    {
        icon: <PenTool className="w-8 h-8 text-purple-400" />,
        title: "Architecture & Design",
        description: "We design custom AI agents and workflow architectures using tools like n8n and Python scripts."
    },
    {
        icon: <Code className="w-8 h-8 text-blue-400" />,
        title: "Development & Testing",
        description: "Our engineers build, test, and refine your automation systems to ensure 99% accuracy and reliability."
    },
    {
        icon: <Rocket className="w-8 h-8 text-green-400" />,
        title: "Deployment & Support",
        description: "We deploy your systems to the cloud and provide ongoing maintenance to keep your business running 24/7."
    }
];

const Process = () => {
    return (
        <section id="process" className="py-24 bg-black/50">
            <div className="container mx-auto px-8 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-cyan-500">Process</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        How we take your business from manual chaos to autonomous scale.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-cyan-500/30 transition-all group relative overflow-hidden h-full flex flex-col"
                        >
                            <div className="mb-4 p-3 bg-black/50 w-fit rounded-xl border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
