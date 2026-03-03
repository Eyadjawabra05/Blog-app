const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');
//load the env variable 
dotenv.config();

//connect the db
connectDB();

const app = express();
const PORT = process.env.PORT || 5000 ;


//middleware to use json
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes);
app.use('/api/posts/:postId/comments',commentRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});