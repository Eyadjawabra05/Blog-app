const Post = require('../models/Post');

const createPost = async (req,res) => {

     try{
          //fetch data from user
          const {title,content} = req.body;

          //create post
          const post = await Post.create({
            title,
            content,
            author:req.user.id   //from middleware
          });

          res.status(201).json(post);
     }catch(error){
        res.status(500).json({message:error.message});
     }

};


const getAllPosts = async (req,res) => {

   try{

     const posts = await Post.find().populate('author','username email').sort({createdAt:-1});

     res.status(200).json(posts);

   }catch(error){
    res.status(500).json({message:error.message});
   }

};


const getPostById = async(req,res)=>{

     try{
         const post = await Post.findById(req.params.id)
           .populate('author','username email') // this return userdata email and username
           .populate('likes','username email');
           
        if(!post){
            return res.status(404).json({message:'Post not found'});
        }
        
        res.status(200).json(post);

     }catch(error){
        res.status(500).json({message:error.message});
     }

};

const updatePost = async(req,res) => {

       try{
          const post = await Post.findById(req.params.id);

          if(!post){
            return res.status(404).json({message:'Post not found'});
          }

          if (post.author.toString() !== req.user.id){
            return res.status(403).json({message:'Not authorized'});
          }
          
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
          );

          res.status(200).json(updatedPost);

       }catch(error){
         res.status(500).json({message:error.message});
       }
};



const deletePost = async(req,res) => {

       try{
           const post = await Post.findById(req.params.id);

           if(!post){
            return res.staus(404).json({message:'Post Not found'});
           }

           //check if he is the post owner
           if(post.author.toString() !== req.user.id){
            return res.status(403).json({message:'Not authorized'});
           }
           
           await post.deleteOne();
           res.status(200).json({message:'Post deleted successfully '});

       }catch(error){
          res.status(500).json({message:error.message});
       }

};

const likePost = async(req,res) => {

      try{  
        const post = await Post.findById(req.params.id);

        if(!post){
          return res.status(404).json({message:'Post not found'});
        }

        // is the user make like before
        if(!post.likes) post.likes = [];
        const isLiked = post.likes.includes(req.user.id);

        if(isLiked){
          //remove the like
          post.likes = post.likes.filter(
            (id) => id.toString() !== req.user.id
          );
        }else{
          post.likes.push(req.user.id);
        }

        await post.save();

        res.status(200).json({
          likes:post.likes.length,
          liked: !isLiked
        })


      }catch(error){
         res.status(500).json({message:error.message});
      }

}





module.exports = {createPost,getAllPosts,getPostById,deletePost,updatePost,likePost};