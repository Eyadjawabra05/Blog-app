import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { token } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post(
                'http://localhost:5000/api/posts',
                { title, content },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/post/${res.data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-800 p-8 rounded-xl">
                    <h1 className="text-white text-3xl font-bold mb-6">Create Post</h1>

                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={8}
                            className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition"
                        >
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;