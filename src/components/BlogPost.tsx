import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, Edit } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getBlogPost } from '../lib/contentful'
import type { BlogPost as BlogPostType } from '../lib/contentful'

const BlogPost = () => {
    const { id } = useParams<{ id: string }>(); // 'id' is actually the slug
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                    const data = await getBlogPost(id);
                    // @ts-expect-error - Casting contentful entry to our type
                    setPost(data);
                } catch (err) {
                    console.error("Error fetching post:", err);
                }
            }
            setLoading(false);
        };
        fetchPost();

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    if (loading) {
        return (
            <div className="pt-40 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 animate-pulse">Loading story...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-40 text-center py-20">
                <h2 className="text-2xl font-bold mb-4 text-white">Story Not Found</h2>
                <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
                <Link to="/blog" className="text-cyan-400 hover:underline flex items-center justify-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>
            </div>
        );
    }

    // Simple parser for basic markdown-like structures
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        let inCodeBlock = false;
        let codeContent: string[] = [];

        return lines.map((line, index) => {
            // Handle code blocks
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    inCodeBlock = false;
                    const code = codeContent.join('\n');
                    codeContent = [];
                    return (
                        <pre key={index} className="overflow-x-auto">
                            <code>{code}</code>
                        </pre>
                    );
                } else {
                    inCodeBlock = true;
                    return null;
                }
            }

            if (inCodeBlock) {
                codeContent.push(line);
                return null;
            }

            // Handle headers
            if (line.startsWith('### ')) {
                return <h3 key={index}>{line.replace('### ', '')}</h3>;
            }
            if (line.startsWith('## ')) {
                return <h2 key={index}>{line.replace('## ', '')}</h2>;
            }

            // Handle dividers
            if (line === '---' || line === '...') {
                return <div key={index} className="divider-dots">...</div>;
            }

            // Handle images: [img:url](caption)
            const imgMatch = line.match(/\[img:(.*?)\]\((.*?)\)/);
            if (imgMatch) {
                return (
                    <div key={index}>
                        <img src={imgMatch[1]} alt={imgMatch[2]} />
                        <p className="caption">{imgMatch[2]}</p>
                    </div>
                );
            }

            // Handle blockquotes
            if (line.startsWith('> ')) {
                return <blockquote key={index}>{line.replace('> ', '')}</blockquote>;
            }

            // Default paragraph
            if (line.trim() === '') return <br key={index} />;

            // Simple bold/italic transformation
            const transformedLine = line
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');

            return <p key={index} dangerouslySetInnerHTML={{ __html: transformedLine }} />;
        }).filter(item => item !== null);
    };

    const shareUrl = window.location.href;
    const shareTitle = post.fields.title;

    return (
        <div className="bg-[#050505] min-h-screen pb-20">
            <Helmet>
                <title>{post.fields.title} | HA Automations</title>
                <meta name="description" content={post.fields.excerpt} />
            </Helmet>

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[60]">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Top Navigation */}
            <div className="sticky top-0 bg-[#050505]/80 backdrop-blur-md z-50 border-b border-white/5 py-4">
                <div className="container mx-auto px-6 max-w-5xl flex items-center justify-between">
                    <Link to="/blog" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Blog</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-xs text-gray-500 font-medium truncate max-w-[200px]">{post.fields.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => navigator.clipboard.writeText(shareUrl)}
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all"
                            title="Copy link"
                        >
                            <LinkIcon className="w-4 h-4" />
                        </button>
                        <a 
                            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-all"
                        >
                            <Twitter className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest border border-cyan-500/20">
                            {post.fields.category || 'Insights'}
                        </span>
                        <div className="h-1 w-1 rounded-full bg-gray-600" />
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{post.fields.readTime || '5 min read'}</span>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                        {post.fields.title}
                    </h1>
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-lg">
                                H
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-medium">Hanzala Kamran</p>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span>{new Date(post.fields.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                <span>•</span>
                                <span className="text-cyan-400/80">Author</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-16 md:mb-24">
                <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-white/5 border border-white/5">
                    {post.fields.coverImage ? (
                        <img 
                            src={post.fields.coverImage.fields.file.url} 
                            alt={post.fields.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-cyan-900/40 via-[#050505] to-purple-900/40 flex items-center justify-center">
                             <div className="text-cyan-400/20 text-9xl font-black">HA</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 max-w-3xl flex relative">
                {/* Fixed Interaction Sidebar (Desktop) */}
                <div className="hidden lg:block absolute -left-24 top-0 h-full">
                    <div className="sticky top-32 flex flex-col gap-6 items-center">
                        <div className="flex flex-col gap-2 items-center text-gray-500">
                             <button className="p-3 rounded-full hover:bg-white/5 hover:text-cyan-400 transition-all border border-transparent hover:border-white/10">
                                <Edit className="w-5 h-5" />
                             </button>
                             <span className="text-[10px] font-bold uppercase tracking-widest">Share</span>
                             <div className="w-[1px] h-12 bg-white/10 my-2" />
                             <a href="#" className="p-2 hover:text-cyan-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
                             <a href="#" className="p-2 hover:text-cyan-400 transition-colors"><Twitter className="w-4 h-4" /></a>
                             <a href="#" className="p-2 hover:text-cyan-400 transition-colors"><Facebook className="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>

                <article className="prose-serif w-full">
                    {renderContent(post.fields.content)}
                </article>
            </div>

            {/* Footer Interaction Bar (Mobile) */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-black/60 backdrop-blur-xl border border-white/10 rounded-full py-4 px-8 z-50 flex items-center justify-around shadow-2xl shadow-cyan-500/10">
                <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Share2 className="w-5 h-5" /></button>
                <div className="w-[1px] h-4 bg-white/10" />
                <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></button>
                <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Twitter className="w-5 h-5" /></button>
                <button className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></button>
            </div>
        </div>
    )
}

export default BlogPost
