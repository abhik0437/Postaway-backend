import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{

    //get token from request
    const authHeader = req.headers["authorization"];

    //return error if no token 

    if(!authHeader){
        return res.status(401).send("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
        req.userId = payload.userId;
        
    }catch(err){
        return res.status(401).send("Unauthorized");
    }

    next();


};

export default jwtAuth;