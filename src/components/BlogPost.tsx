import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getBlogPost } from '../lib/contentful'
import type { BlogPost as BlogPostType } from '../lib/contentful'

const BlogPost = () => {
    const { id } = useParams<{ id: string }>(); // 'id' is actually the slug based on App.tsx route
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                const data = await getBlogPost(id);
                // @ts-expect-error - Casting contentful entry to our type
                setPost(data);
            }
            setLoading(false);
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="pt-32 text-center text-gray-400">Loading post...</div>;
    if (!post) return <div className="pt-32 text-center text-gray-400">Post not found.</div>;

    return (
        <>
            <Helmet>
                <title>{post.fields.title} | HA Automations</title>
                <meta name="description" content={post.fields.excerpt} />
            </Helmet>
            <div className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:text-cyan-300 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                <article className="prose prose-invert prose-lg max-w-none">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {post.fields.title}
                    </h1>
                    <div className="flex items-center gap-4 text-gray-400 mb-12 text-sm">
                        <span>{new Date(post.fields.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{post.fields.category}</span>
                        <span>•</span>
                        <span>{post.fields.readTime}</span>
                    </div>

                    <div className="space-y-6 text-gray-300 whitespace-pre-wrap">
                        {/* Rendering simple text content for now. Contentful rich text would need a renderer */}
                        {post.fields.content}
                    </div>
                </article>
            </div>
        </>
    )
}

export default BlogPost
