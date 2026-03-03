import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-700 px-8 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold tracking-tight">
                    ✍️ BlogApp
                </Link>

                {/* Right Side */}
                {user && (
                    <div className="flex items-center gap-3">
                        <Link
                            to="/myposts"
                            className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                        >
                            My Posts
                        </Link>
                        <Link
                            to="/create"
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
                        >
                            + New Post
                        </Link>
                        <div className="w-px h-6 bg-gray-600" />
                        <span className="text-gray-300 text-sm">
                            👤 {user.username}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;