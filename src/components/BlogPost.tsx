import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BlogPost = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:text-cyan-300 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <article className="prose prose-invert prose-lg max-w-none">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    How AI Agents Are Revolutionizing Customer Support
                </h1>
                <div className="flex items-center gap-4 text-gray-400 mb-12 text-sm">
                    <span>March 15, 2024</span>
                    <span>•</span>
                    <span className="text-cyan-400">AI Agents</span>
                    <span>•</span>
                    <span>5 min read</span>
                </div>

                <div className="space-y-6 text-gray-300">
                    <p className="lead text-xl text-gray-200">
                        The customer support landscape is changing rapidly. Gone are the days of waiting 24 hours for an email response. Today's customers expect instant answers, and AI agents are making that possible at scale.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">The Problem with Traditional Support</h2>
                    <p>
                        Scaling a human support team is expensive and difficult. Training takes time, turnover is high, and humans need sleep. Your customers, however, are global and active 24/7.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-6">Enter AI Agents</h2>
                    <p>
                        Unlike simple chatbots of the past, modern AI agents understand context, can perform actions (like checking order status or processing refunds), and learn from interactions.
                    </p>

                    <ul className="list-disc pl-6 space-y-2 my-8 marker:text-cyan-500">
                        <li>Instant response times (under 5 seconds)</li>
                        <li>24/7 availability without overtime pay</li>
                        <li>Consistent, accurate answers</li>
                        <li>Seamless handoff to humans for complex issues</li>
                    </ul>

                    <p>
                        By implementing an AI agent using tools like OpenAI and n8n, we've helped clients reduce their ticket volume by over 80% while improving customer satisfaction scores.
                    </p>
                </div>
            </article>
        </div>
    )
}

export default BlogPost
