import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchPosts, deletePost } from '../api/posts';
import BlogCard from '../components/BlogCard';
import { User, Mail, PenSquare, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { currentUser } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserPosts = async () => {
            if (!currentUser) return;
            
            try {
                // Fetch all posts and filter client-side 
                // (For a larger app, you would want a specific backend endpoint like /api/posts?author=id)
                const allPosts = await fetchPosts();
                
                // Filter posts where the author.email or author.id matches the current user
                // We use email here as a fallback, but ID is preferred if your Post model saves the Firebase UID
                const userPosts = allPosts.filter(post => 
                    post.author?.email === currentUser.email || 
                    post.author?.id === currentUser.uid
                ).map(post => ({
                    ...post,
                    id: post._id // Ensure ID consistency
                }));

                setMyPosts(userPosts);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUserPosts();
    }, [currentUser]);

    const handleDelete = async (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost(postId);
                setMyPosts(myPosts.filter(post => post.id !== postId));
            } catch (error) {
                console.error("Failed to delete post:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Profile Header */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                <div className="bg-gradient-to-r from-primary-600 to-indigo-700 h-32"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex items-end -mt-12 mb-6">
                        <div className="p-1 bg-white rounded-2xl">
                            <div className="h-24 w-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                                <User className="h-12 w-12" />
                            </div>
                        </div>
                        <div className="ml-6 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {currentUser?.displayName || 'My Profile'}
                            </h1>
                            <div className="flex items-center text-gray-500 mt-1">
                                <Mail className="h-4 w-4 mr-2" />
                                {currentUser?.email}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm border-t border-gray-100 pt-6">
                        <div className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
                            {myPosts.length} Stories Published
                        </div>
                    </div>
                </div>
            </div>

            {/* My Posts Grid */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Stories</h2>
                
                {myPosts.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
                        <PenSquare className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No stories yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Share your first story with the world.</p>
                        <Link
                            to="/create-post"
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-all"
                        >
                            Write Story
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {myPosts.map(post => (
                            <div key={post.id} className="relative group">
                                <BlogCard post={post} />
                                {/* Overlay Actions for Author */}
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link 
                                        to={`/edit-post/${post.id}`}
                                        className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg shadow-sm hover:text-primary-600 hover:scale-105 transition-all"
                                        title="Edit"
                                    >
                                        <PenSquare className="h-4 w-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg shadow-sm hover:text-red-600 hover:scale-105 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}