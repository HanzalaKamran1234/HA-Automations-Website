
import { motion } from 'framer-motion';

const stats = [
    { label: "Projects Completed", value: "50+", suffix: "" },
    { label: "Leads Scraped", value: "10k+", suffix: "" },
    { label: "Automated Actions", value: "100k+", suffix: "" },
    { label: "System Uptime", value: "99.9", suffix: "%" },
];

const Stats = () => {
    return (
        <section className="py-20 bg-black/30 border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}{stat.suffix}
                            </div>
                            <div className="text-gray-500 font-medium uppercase tracking-widest text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
