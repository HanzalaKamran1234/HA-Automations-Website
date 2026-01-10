

const TechStack = () => {
    const technologies = [
        "React", "Node.js", "AWS", "Python", "OpenAI", "n8n", "TensorFlow", "Docker", "FastAPI", "PostgreSQL", "LangChain"
    ];

    return (
        <section className="py-10 border-y border-white/5 bg-black/50 overflow-hidden">
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-12 text-2xl font-bold text-gray-500/50 uppercase tracking-widest px-6">
                    {technologies.map((tech) => (
                        <span key={tech} className="hover:text-cyan-500/80 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {technologies.map((tech) => (
                        <span key={`${tech}-dup`} className="hover:text-cyan-500/80 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 text-2xl font-bold text-gray-500/50 uppercase tracking-widest px-6">
                    {technologies.map((tech) => (
                        <span key={`${tech}-2`} className="hover:text-cyan-500/80 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                    {technologies.map((tech) => (
                        <span key={`${tech}-dup2`} className="hover:text-cyan-500/80 transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
