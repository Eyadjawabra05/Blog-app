import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <h1 className="text-white text-4xl font-bold mb-8 text-center">Latest Posts</h1>

            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                {posts.map((post) => (
                    <Link to={`/post/${post._id}`} key={post._id}>
                        <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
                            <h2 className="text-white text-2xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-400 mb-4">{post.content.substring(0, 100)}...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-blue-400">By {post.author.username}</span>
                                <span className="text-gray-500 text-sm">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="mt-2 text-gray-400">
                                ❤️ {post.likes.length} likes
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;