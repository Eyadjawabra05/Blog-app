import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostPage from './pages/PostPage';
import CreatePost from './pages/CreatePost';
import MyPosts from './pages/MyPosts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <><Navbar /><Home /></>
                    </ProtectedRoute>
                } />
                <Route path="/post/:id" element={
                    <ProtectedRoute>
                        <><Navbar /><PostPage /></>
                    </ProtectedRoute>
                } />
                <Route path="/create" element={
                    <ProtectedRoute>
                        <><Navbar /><CreatePost /></>
                    </ProtectedRoute>
                } />
                <Route path="/myposts" element={
                    <ProtectedRoute>
                        <><Navbar /><MyPosts /></>
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;