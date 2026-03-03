const Comment = require('../models/Comment');
const Post = require('../models/Post');


const createComment = async (req,res) => {
    
    try{
        //fetch data from req
        const {content} = req.body;

        //check if post is exist
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(404).json({message:'Post not found'});
        }

        //make comment
        const comment = await Comment.create({
            content,
            post:req.params.postId,
            author:req.user.id

        });

        await comment.populate('author','username email');

        res.status(201).json(comment);


    }catch(error){
        res.status(500).json({message:error.message});
    }

};


//get all comment
const getComments = async (req,res) => {

      try{

           const comments = await Comment.find({post:req.params.postId})
            .populate('author','username email')
            .sort({createdAt:-1});

            res.status(200).json(comments);

      }catch(error){
           res.status(500).json({message:error.message});
      }

} ;

//delete comment
const deleteComment = async(req,res) => {

   try{
      const comment = await Comment.findById(req.params.id);
      
      if(!comment){
        return res.status(404).json({message:"Comment not found"});
      }

      if(comment.author.toString() !== req.user.id){
        return res.status(403).json({message:'Not authorized'});
      }

      await comment.deleteOne();
      res.status(200).json({message:'Comment deleted successfully'});


   }catch(error){
      res.status(500).json({message:error.message});
   }

};

module.exports = {createComment,getComments,deleteComment};

