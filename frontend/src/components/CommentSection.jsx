import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CommentSection({ postId }) {
    const { token, user } = useAuth();
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/posts/${postId}/comments`
                );
                setComments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `http://localhost:5000/api/posts/${postId}/comments`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([res.data, ...comments]);
            setContent('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/posts/${postId}/comments/${commentId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments(comments.filter(c => c._id !== commentId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl">
            <h2 className="text-white text-2xl font-bold mb-6">Comments</h2>

            {/* Add Comment */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Post
                </button>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-bold">
                                {comment.author.username}
                            </span>
                            {user?._id === comment.author._id && (
                                <button
                                    onClick={() => handleDelete(comment._id)}
                                    className="text-red-400 hover:text-red-300 text-sm transition"
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSection;