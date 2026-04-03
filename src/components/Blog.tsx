import { useEffect, useState } from 'react'
import { ArrowRight, Clock, Tag, Calendar } from 'lucide-react'
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

    const featuredPost = posts[0];
    const remainingPosts = posts.slice(1);

    return (
        <>
            <Helmet>
                <title>Blog | HA Automations</title>
                <meta name="description" content="Insights on AI automation, software engineering, and scaling your business." />
            </Helmet>
            <div className="pt-32 pb-20 container mx-auto px-8 md:px-6">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        The <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Automation</span> Blog
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
                        Technical insights, phase updates, and guides on building the future of AI automation.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                        <p className="text-gray-400 animate-pulse">Fetching the latest insights...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-400 py-20 bg-red-500/5 rounded-3xl border border-red-500/20 max-w-2xl mx-auto">
                        <p className="text-xl font-semibold mb-2">Could not load articles</p>
                        <p className="text-sm opacity-80">{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-40 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-lg italic">The library is currently being updated. Check back soon!</p>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        {/* Featured Post */}
                        {featuredPost && (
                            <Link to={`/blog/${featuredPost.fields.slug}`} className="group block mb-16">
                                <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-cyan-500/30 group-hover:bg-white/10">
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                                            {featuredPost.fields.coverImage?.fields?.file?.url ? (
                                                <img 
                                                    src={featuredPost.fields.coverImage.fields.file.url} 
                                                    alt={featuredPost.fields.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center">
                                                    <Tag className="w-16 h-16 text-white/10" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wide uppercase">
                                                    Featured Story
                                                </span>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{featuredPost.fields.readTime || '5 min read'}</span>
                                                </div>
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-cyan-400 transition-colors leading-tight">
                                                {featuredPost.fields.title}
                                            </h2>
                                            <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed line-clamp-3 font-light">
                                                {featuredPost.fields.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                        H
                                                    </div>
                                                    <div className="text-sm">
                                                        <p className="text-white font-medium">Hanzala Kamran</p>
                                                        <p className="text-gray-500">{new Date(featuredPost.fields.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                                    </div>
                                                </div>
                                                <span className="flex items-center gap-2 text-white font-medium group-hover:translate-x-2 transition-transform">
                                                    Read Full Story <ArrowRight className="w-5 h-5 text-cyan-400" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Remaining Posts Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {remainingPosts.map((post) => (
                                <Link to={`/blog/${post.fields.slug}`} key={post.fields.slug} className="group block">
                                    <article className="bg-[#0f0f0f] border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:-translate-y-2 h-full flex flex-col">
                                        <div className="aspect-[16/9] overflow-hidden relative">
                                            {post.fields.coverImage?.fields?.file?.url ? (
                                                <img 
                                                    src={post.fields.coverImage.fields.file.url} 
                                                    alt={post.fields.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-tr from-gray-900 to-black flex items-center justify-center">
                                                    <Tag className="w-12 h-12 text-white/5" />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                                    {post.fields.category || 'Insights'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span>{new Date(post.fields.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    <span>{post.fields.readTime || '5 min'}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                {post.fields.title}
                                            </h3>
                                            <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3 text-sm font-light">
                                                {post.fields.excerpt}
                                            </p>
                                            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Read more</span>
                                                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Blog
