import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "How AI Agents Are Revolutionizing Customer Support",
            excerpt: "Discover how autonomous agents can handle 80% of your support tickets instantly, 24/7, without human intervention.",
            date: "March 15, 2024",
            category: "AI Agents",
            readTime: "5 min read"
        },
        {
            id: 2,
            title: "Automating Lead Generation with Python & n8n",
            excerpt: "A step-by-step guide to building a lead scraper and qualification workflow that fills your CRM while you sleep.",
            date: "March 10, 2024",
            category: "Automation",
            readTime: "8 min read"
        },
        {
            id: 3,
            title: "Why Your Agency Needs Custom Workflow Automation",
            excerpt: "Stop wasting hours on manual data entry. Learn how to connect your tools and automate your business logic.",
            date: "March 5, 2024",
            category: "Business Growth",
            readTime: "4 min read"
        },
        {
            id: 4,
            title: "The Future of Work: Humans + AI",
            excerpt: "AI isn't here to replace you; it's here to give you super powers. Here is how to adapt and thrive.",
            date: "February 28, 2024",
            category: "Insights",
            readTime: "6 min read"
        }
    ]

    return (
        <div className="pt-32 pb-20 container mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Latest <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Insights</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Thoughts, tutorials, and guides on AI automation, software engineering, and scaling your business.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link to={`/blog/${post.id}`} key={post.id} className="block">
                        <article className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all hover:bg-white/10 group cursor-pointer h-full flex flex-col">
                            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                <span className="text-cyan-400 font-medium">{post.category}</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 justify-between mt-auto">
                                <span>{post.date}</span>
                                <span className="flex items-center gap-2 group-hover:translate-x-2 transition-transform text-white">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Blog
