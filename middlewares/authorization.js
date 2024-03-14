const jwt = require('jsonwebtoken');
const jwt_pass = process.env.JWT_PASSWORD;

const userAuth = (req,res,next) => {
    try{
        const token = req.headers["authorization"]?.split(' ')[1];
        jwt.verify(token,jwt_pass,(err,decodedToken)=>{
            if(decodedToken){
                req.userId = decodedToken.userId
                next()
            }
            else {
                res.status(401).json({message:'unauthorized user'})
            }
        });
    }catch(error){
        console.log(error);
        res.status(401).json({message:'unauthorized user'})
    }
    
}

module.exports={userAuth}