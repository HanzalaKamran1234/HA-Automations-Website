
import { Workflow, Bot, Database, Zap, ChevronLeft, ChevronRight, BarChart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Services = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            icon: <Bot className="w-8 h-8 text-cyan-400" />,
            title: "AI Agent Development",
            description: "Custom AI agents tailored to your business needs, capable of handling customer support, data analysis, and more, operating 24/7.",
        },
        {
            icon: <Workflow className="w-8 h-8 text-purple-400" />,
            title: "Workflow Automation",
            description: "End-to-end automation using n8n and Make to connect your apps, reduce manual errors, and streamline operations.",
        },
        {
            icon: <Zap className="w-8 h-8 text-yellow-400" />,
            title: "Python Scripting",
            description: "Powerful custom scripts to handle complex data processing, web scraping, and system integrations that low-code tools can't touch.",
        },
        {
            icon: <Database className="w-8 h-8 text-green-400" />,
            title: "CRM Integration",
            description: "Seamless synchronization between your CRM (HubSpot, Salesforce) and other tools to keep your data clean and actionable.",
        },
        {
            icon: <BarChart className="w-8 h-8 text-pink-400" />,
            title: "Data Analytics",
            description: "Turn raw data into actionable insights with automated reporting dashboards and predictive analytics models.",
        },
        {
            icon: <Globe className="w-8 h-8 text-blue-400" />,
            title: "Web Scraping",
            description: "Extract valuable data from websites at scale to fuel your lead generation or market research efforts.",
        }
    ];

    // Duplicate services to create infinite illusion
    const extendedServices = [...services, ...services, ...services, ...services];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 330; // Card width (300) + gap (32 approx)
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Infinite scroll check
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            // If near end, jump to middle
            if (scrollLeft + clientWidth >= scrollWidth - 100) {
                scrollRef.current.scrollLeft = scrollWidth / 2 - clientWidth / 2;
            }
            // If near start, jump to middle
            if (scrollLeft <= 100) {
                scrollRef.current.scrollLeft = scrollWidth / 2 - clientWidth / 2;
            }
        }
    };

    useEffect(() => {
        // Initial center scroll
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            scrollRef.current.scrollLeft = scrollWidth / 2 - clientWidth / 2;
        }
    }, []);


    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="text-cyan-500">Services</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We combine cutting-edge AI with robust automation engineering to deliver solutions that drive real growth.
                    </p>
                </div>

                <div className="relative group/container">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-12 z-20 
                                 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 backdrop-blur-md 
                                 text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    {/* Services Container */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {extendedServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.05 }}
                                viewport={{ once: true }}
                                className="w-[280px] md:w-[300px] snap-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group flex-shrink-0 flex flex-col justify-between shadow-lg hover:shadow-cyan-500/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="mb-4 p-3 bg-black/50 w-fit rounded-2xl border border-white/10 group-hover:border-cyan-500/30 transition-colors shadow-inner">
                                        {service.icon}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-12 z-20 
                                 p-3 md:p-4 rounded-full bg-black/50 border border-white/10 backdrop-blur-md 
                                 text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all shadow-xl"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Services;
