import { Rocket, TrendingUp, Shield, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Rocket className="w-8 h-8 text-purple-500" />,
        title: "Automation-First",
        description: "We believe every manual task that can be automated, should be."
    },
    {
        icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
        title: "Business ROI",
        description: "Solutions designed to increase revenue and save valuable time."
    },
    {
        icon: <Shield className="w-8 h-8 text-purple-500" />,
        title: "Clean & Secure",
        description: "Enterprise-grade code security and data protection standards."
    },
    {
        icon: <Headset className="w-8 h-8 text-purple-500" />,
        title: "Long-term Support",
        description: "We don't just build and leave; we ensure your systems keep running."
    }
];

const WhyChooseUs = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Why Choose <span className="text-cyan-400">Us?</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="relative inline-block mb-6">
                                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/40 transition-all duration-300" />
                                <div className="relative p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-all">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
