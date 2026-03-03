import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function MyPosts() {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                // فلتر فقط posts اليوزر الحالي
                const myPosts = res.data.filter(
                    post => post.author._id === user._id
                );
                setPosts(myPosts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter(p => p._id !== postId));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-white text-3xl font-bold">My Posts</h1>
                    <Link
                        to="/create"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        + New Post
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <div className="bg-gray-800 p-8 rounded-xl text-center">
                        <p className="text-gray-400 text-lg mb-4">You have no posts yet</p>
                        <Link
                            to="/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                        >
                            Create your first post
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-gray-800 p-6 rounded-xl">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-white text-xl font-bold mb-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm mb-3">
                                            {post.content.substring(0, 100)}...
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>❤️ {post.likes.length} likes</span>
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            to={`/post/${post._id}`}
                                            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition text-sm"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/edit/${post._id}`}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyPosts;