import { motion } from 'framer-motion';
import { Code, Brain } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative z-10 rounded-3xl p-8 md:p-12 border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
                    >
                        {/* Background Gradient/Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center gap-10">
                            {/* Left: Avatar/Icon or Image Placeholder if they had one, using generic User icon for now */}
                            <div className="shrink-0 relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-1">
                                    <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                                        <img
                                            src="/profile.jpg"
                                            alt="Hanzala Kamran"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-black border border-white/10 p-2 rounded-xl">
                                    <Brain className="w-5 h-5 text-cyan-400" />
                                </div>
                            </div>

                            {/* Right: Content */}
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold mb-2">About <span className="text-cyan-400">Me</span></h2>
                                <h3 className="text-xl font-semibold text-white mb-6">
                                    I'm <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Hanzala Kamran</span>
                                </h3>

                                <p className="text-gray-300 leading-relaxed mb-6">
                                    I am a passionate AI Automation & AI Agent Developer with hands-on experience in building smart automation solutions. I have completed two Python certifications and successfully finished an internship in AI Agents, where I worked on real-world AI workflows.
                                </p>

                                <p className="text-gray-300 leading-relaxed">
                                    I specialize in Python automation, AI agents, and AI automation systems, helping businesses save time and improve efficiency. I am continuously learning and growing in the field of Artificial Intelligence to deliver high-quality and reliable solutions.
                                </p>

                                {/* Mini Stats/Features */}
                                <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300">
                                        <Code className="w-4 h-4 text-purple-400" />
                                        <span>Python Specialist</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm md:text-base text-gray-300">
                                        <Brain className="w-4 h-4 text-cyan-400" />
                                        <span>AI Agents</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
