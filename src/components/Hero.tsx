
import { Bot, Code2, Cpu } from 'lucide-react';
import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const Hero = () => {
    const mouseX = useSpring(0, { stiffness: 50, damping: 10 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 10 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250); // Center the 500px circle
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
        >
            {/* Interactive Mouse Glow */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-0"
            />
            {/* Background Gradient - Wrapped to prevent overflow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm text-gray-300">Accepting New Clients</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold leading-tight">
                        AI Automations That <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Scale Your Business</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg">
                        We build intelligent agents and workflow automations using Python and n8n to replace manual tasks with autonomous systems.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:bg-cyan-300 flex items-center justify-center">
                            <span>Book a Free Consultation</span>
                        </a>
                        <a href="#projects" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm">
                            View Projects
                        </a>
                    </div>

                    <div className="flex items-center gap-8 pt-8 text-gray-500">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-cyan-500" />
                            <span>AI Agents</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-purple-500" />
                            <span>Custom Code</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Cpu className="w-5 h-5 text-blue-500" />
                            <span>Automation</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative z-10 border border-white/10 bg-white/5 backdrop-blur-sm max-w-md mx-auto glow-box rounded-2xl">
                        {/* Uses the image uploaded by the USER */}
                        <img
                            src="/hero-image.jpg"
                            alt="Founder"
                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl"
                        />

                        {/* Floating Cards */}
                        {/* Python Pill (Top Left) */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute left-0 md:-left-4 top-12 bg-black border border-cyan-500 rounded-full py-2 px-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-20 flex items-center gap-2"
                        >
                            <span className="text-xl">🐍</span> {/* Using emoji for colorful python icon representation or custom svg if preferred, sticking to simple first */}
                            <span className="font-bold text-white">Python</span>
                        </motion.div>

                        {/* AI Agents Pill (Right Middle) */}
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}
                            className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 bg-black border border-cyan-500 rounded-full py-2 px-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-20 flex items-center gap-2"
                        >
                            <Bot className="w-5 h-5 text-cyan-400" />
                            <span className="font-bold text-white">AI Agents</span>
                        </motion.div>

                        {/* n8n Pill (Bottom Right) */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                            className="absolute right-0 md:-right-4 bottom-12 bg-black border border-cyan-500 rounded-full py-2 px-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-20 flex items-center gap-2"
                        >
                            <span className="text-pink-500 font-bold text-lg">⚡</span>
                            <span className="font-bold text-white">n8n</span>
                        </motion.div>
                    </div>

                    {/* Decorative Elements behind image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
