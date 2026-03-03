import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CommentSection from '../components/CommentSection';

function PostPage() {
    const { id } = useParams();
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setPost(res.data);
                setEditTitle(res.data.title);
                setEditContent(res.data.content);
                setLiked(res.data.likes.some(like =>
                    like === user?._id || like._id === user?._id
                ));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleLike = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${id}/like`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setLiked(res.data.liked);
            setPost(prev => ({ ...prev, likes: { length: res.data.likes } }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:5000/api/posts/${id}`,
                { title: editTitle, content: editContent },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPost(res.data);
            setIsEditing(false);
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
                <div className="bg-gray-800 p-8 rounded-xl mb-8">

                    {isEditing ? (
                        // Edit Mode
                        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                rows={8}
                                className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        // View Mode
                        <>
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-white text-4xl font-bold">{post.title}</h1>
                                {/* Edit و Delete فقط لصاحب الـ post */}
                                {user?._id === post.author._id && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-blue-400">By {post.author.username}</span>
                                <span className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.content}</p>
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                    liked
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                }`}
                            >
                                ❤️ {liked ? 'Liked' : 'Like'} · {post.likes.length}
                            </button>
                        </>
                    )}
                </div>

                <CommentSection postId={id} />
            </div>
        </div>
    );
}

export default PostPage;