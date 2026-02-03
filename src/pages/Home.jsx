import { useState, useEffect } from 'react';
import { fetchPosts } from '../api/posts';
import { PenSquare } from 'lucide-react';
import BlogCard from '../components/BlogCard';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                // Map _id to id for compatibility
                const mappedPosts = data.map(post => ({
                    ...post,
                    id: post._id
                }));
                setPosts(mappedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative max-w-4xl mx-auto text-center px-4">
                    <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-600 ring-1 ring-inset ring-primary-500/10 mb-6">
                        <span className="mr-2">✨</span> Discover creative ideas
                    </span>
                    <h1 className="text-5xl font-serif font-bold text-gray-900 tracking-tight sm:text-6xl mb-6">
                        Stories that <span className="text-primary-700">inspire</span> and <span className="text-primary-700">connect</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A place where updated thoughts, trends, and expertise come together. Join our community of writers and readers.
                    </p>
                </div>
            </section>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                    <div className="flex space-x-2">
                        {/* Filter buttons could go here */}
                    </div>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-3xl border border-white/20 shadow-sm border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PenSquare className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
                        <p className="text-gray-500 mt-1">Be the first to share your story with the world.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
