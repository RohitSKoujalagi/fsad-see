import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { User, Calendar, PenSquare } from 'lucide-react';
import { useState } from 'react';

export default function BlogCard({ post }) {
    const [imgSrc, setImgSrc] = useState(post.coverImage);
    const [imgError, setImgError] = useState(false);

    // Safe date formatting
    // Safe date formatting
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recently';
        let date;
        if (timestamp.toDate && typeof timestamp.toDate === 'function') {
            date = timestamp.toDate();
        } else {
            date = new Date(timestamp);
        }
        return format(date, 'MMM d, yyyy');
    };

    // Strip HTML tags for summary
    const createExcerpt = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const handleImageError = () => {
        setImgError(true);
        setImgSrc('https://images.unsplash.com/photo-1499750310159-5b5f8f9460a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');
    };

    return (
        <div className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-sm border border-white/20 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Image Container */}
            <div className="h-56 w-full overflow-hidden bg-gray-100 relative">
                {post.coverImage ? (
                    <img
                        src={imgError ? imgSrc : post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={handleImageError}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <PenSquare className="h-10 w-10 text-gray-300" />
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    Article
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xs ring-2 ring-white">
                        {post.author.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 leading-none">{post.author.name}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <Link to={`/post/${post.id}`} className="block mb-3">
                    <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {createExcerpt(post.content).substring(0, 150)}...
                </p>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link
                        to={`/post/${post.id}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm inline-flex items-center transition-colors"
                    >
                        Read Article <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                        5 min read
                    </span>
                </div>
            </div>
        </div>
    );
}
