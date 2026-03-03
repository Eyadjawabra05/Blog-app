const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req,res) => {

      try{
          //fetch data from request
          const {username,email,password} = req.body;
          
          // check if user is registerd before
          const existingUser = await User.findOne({email});
          if(existingUser){
            return res.status(400).json({message:'Email already exists'});
          }

          //hash the password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password,salt);


          //make user and save it
          const user = await User.create({
            username,
            email,
            password:hashedPassword
          });

          res.status(201).json({message:'User registerd successfully'});

      }
      catch(error){
        res.status(500).json({message:error.message});
      }


};


const login = async (req,res) => {

       try{
          //fetch data from req
          const {username,email,password} = req.body;
          
          //is email in database make check
          const user = await User.findOne({email});
          if(!user){
            return res.status(400).json({message:'Invalid credntials'});
          }
          
          //compare the password with the hashed password
          const isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch){
            return res.status(400).json({message:'Invalid credintials'});
          }
          
          //is match we genrate token 
          const token = jwt.sign(
               {id:user._id},
               process.env.JWT_SECRET,
               {expiresIn:'7d'}
          );
          //return token
          res.status(200).json({token});
       }
       catch(error){
          res.status(500).json({message:error.message});
       }

};

const getMe = async(req,res) => {

     try{
         //middleware make sure from req.user
         //and here we till response it to get all user data without the password
         const user = await User.findById(req.user.id).select('-password');
         res.status(200).json(user);

     }catch(error){
       res.status(500).json({messsage:error.message});
     }

}



module.exports = {register,login,getMe};