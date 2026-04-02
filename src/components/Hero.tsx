
import { Bot, Code2, Cpu, Mail, Target } from 'lucide-react';
import { motion, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const Hero = () => {
    const mouseX = useSpring(0, { stiffness: 50, damping: 10 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 10 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 250);
            mouseY.set(e.clientY - 250);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section
            className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
        >
            {/* Interactive Mouse Glow — desktop only */}
            <motion.div
                style={{ x: mouseX, y: mouseY }}
                className="hidden md:block fixed top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none z-0"
            />

            {/* Background Gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Main Grid */}
            <div className="container mx-auto px-5 sm:px-8 md:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                        </span>
                        <span className="text-sm text-gray-300">Accepting New Clients</span>
                    </div>

                    {/* Headline — smaller on mobile */}
                    <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-tight">
                        AI &amp; Outreach Automations That{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Scale Your Business
                        </span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-400 max-w-lg">
                        We build intelligent agents, outreach systems, and workflow automations to replace manual tasks with autonomous scale.
                    </p>

                    {/* CTA Buttons — stacked on mobile, row on sm+ */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-7 py-4 bg-cyan-400 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:shadow-[0_0_40px_rgba(34,211,238,0.8)] hover:bg-cyan-300 flex items-center justify-center text-center"
                        >
                            Book a Free Consultation
                        </a>
                        <a
                            href="#projects"
                            className="w-full sm:w-auto px-7 py-4 border border-white/20 rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm flex items-center justify-center text-center"
                        >
                            View Projects
                        </a>
                    </div>

                    <div className="flex items-center gap-6 md:gap-8 pt-4 md:pt-8 text-gray-500 flex-wrap">
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
                    className="relative w-full"
                >
                    {/*
                      Image card — clamped to 90% of viewport width so it NEVER
                      overflows on a 360px screen. max-w-md only applies on larger screens.
                    */}
                    <div className="relative z-10 border border-white/10 bg-white/5 backdrop-blur-sm w-full max-w-[min(28rem,92vw)] mx-auto glow-box rounded-2xl overflow-hidden">
                        <img
                            src="/hero-image.jpg"
                            alt="Founder"
                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 rounded-2xl"
                            style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                        />

                        {/* Python Pill (Top Left) — tighter on mobile */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute left-3 top-10 bg-black border border-cyan-500 rounded-full py-1.5 px-3 shadow-[0_0_15px_rgba(6,182,212,0.3)] z-20 flex items-center gap-1.5"
                        >
                            <span className="text-lg">🐍</span>
                            <span className="font-bold text-white text-sm">Python</span>
                        </motion.div>

                        {/* Outreach Pill (Right Middle) */}
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black border border-purple-500 rounded-full py-1.5 px-3 shadow-[0_0_15px_rgba(168,85,247,0.3)] z-20 flex items-center gap-1.5"
                        >
                            <Mail className="w-4 h-4 text-purple-400" />
                            <span className="font-bold text-white text-sm">Outreach</span>
                        </motion.div>

                        {/* Lead Gen Pill (Bottom Right) */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                            className="absolute right-3 bottom-10 bg-black border border-orange-500 rounded-full py-1.5 px-3 shadow-[0_0_15px_rgba(249,115,22,0.3)] z-20 flex items-center gap-1.5"
                        >
                            <Target className="w-4 h-4 text-orange-500" />
                            <span className="font-bold text-white text-sm">Lead Gen</span>
                        </motion.div>
                    </div>

                    {/*
                      Decorative orbit rings — HIDDEN on mobile (they cause horizontal overflow).
                      Visible on md+ where the wider viewport can absorb the overflow via overflow-hidden on section.
                    */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-purple-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
