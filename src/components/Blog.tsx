import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getBlogPosts } from '../lib/contentful'
import type { BlogPost } from '../lib/contentful'

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                setPosts(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Helmet>
                <title>Blog | HA Automations</title>
                <meta name="description" content="Insights on AI automation, software engineering, and scaling your business." />
            </Helmet>
            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Latest <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Insights</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Thoughts, tutorials, and guides on AI automation, software engineering, and scaling your business.
                    </p>

                    {/* Debug Info - Remove after fixing */}
                    <div className="mt-4 p-4 bg-gray-900/50 rounded-lg text-xs font-mono text-left max-w-md mx-auto border border-gray-800">
                        <p className="text-gray-500 mb-1">Debug Status:</p>
                        <p className={import.meta.env.VITE_CONTENTFUL_SPACE_ID ? "text-green-500" : "text-red-500"}>
                            Space ID: {import.meta.env.VITE_CONTENTFUL_SPACE_ID ? 'Configured ✅' : 'Missing ❌'}
                        </p>
                        <p className={import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ? "text-green-500" : "text-red-500"}>
                            Access Token: {import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ? 'Configured ✅' : 'Missing ❌'}
                        </p>
                        {error && <p className="text-red-400 mt-2">Error: {error}</p>}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center text-gray-400 py-20">Loading articles...</div>
                ) : error ? (
                    <div className="text-center text-red-400 py-20">
                        <p>Something went wrong loading the blog.</p>
                        <p className="text-sm mt-2">{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p>No articles found. Check your Contentful configuration.</p>
                        <p className="text-sm mt-4 text-gray-500">
                            (Make sure VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN are set)
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link to={`/blog/${post.fields.slug}`} key={post.fields.slug} className="block">
                                <article className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all hover:bg-white/10 group cursor-pointer h-full flex flex-col">
                                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                        <span className="text-cyan-400 font-medium">{post.fields.category || 'General'}</span>
                                        <span>{post.fields.readTime || '5 min read'}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                                        {post.fields.title}
                                    </h2>
                                    <p className="text-gray-400 mb-6 leading-relaxed flex-grow line-clamp-3">
                                        {post.fields.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500 justify-between mt-auto">
                                        <span>{post.fields.date}</span>
                                        <span className="flex items-center gap-2 group-hover:translate-x-2 transition-transform text-white">
                                            Read Article <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Blog
