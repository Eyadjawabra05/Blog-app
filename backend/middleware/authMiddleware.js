const jwt = require('jsonwebtoken');

const protect = (req,res,next) => {

      try{

           //fetch header from token
           const token = req.headers.authorization?.split(' ')[1];

           //check if token is exist
           if(!token){
              return res.status(401).json({message:'No token, authorization denied'});
           }
           //check the token
           const decoded = jwt.verify(token,process.env.JWT_SECRET);

           //add data request to user
           req.user = decoded;
           //كمل لل  controller
           next();
      }
      catch(error){
         res.status(401).json({message:'Token is not valid'});
      }

};

module.exports = protect;