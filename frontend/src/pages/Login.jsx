import {useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';


function Login(){

     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [error,setError] = useState('');
     const [loading,setLoading] = useState(false);

     const {login} = useAuth();
     const navigate = useNavigate();

     const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            //send request to the backend
            const res = await axios.post('http://localhost:5000/api/auth/login',{
                email,
                password
            });

            const userRes = await axios.get('http://localhost:5000/api/auth/me',{
                headers: { Authorization: `Bearer ${res.data.token}` }
            });
        
         
        //save user data in Context
        login(userRes.data,res.data.token);

        //go to home 
        navigate('/');

     } catch (err){
        setError(err.response?.data.message || 'Something went wrong');
     } finally {
        setLoading(false);
     }
    }

     return (
           <div className="min-h-screen bg-gray-900 flex items-center justify-center">
               <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md">
                    <h2 className="text-white text-3xl font-bold mb-6 text-center">Login</h2>
                    {error && (
                        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                            {error}
                        </div>    

                    )}

                    
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Register
                    </Link>
                </p>

               </div>


           </div>

     );
     
};

export default Login;