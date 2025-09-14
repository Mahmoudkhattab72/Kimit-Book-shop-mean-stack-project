const jwt = require('jsonwebtoken');
const auth = (request, response, next) =>{
    const authHeader = request.headers.authorization;
        if (authHeader === undefined){
            return response.status(401).json("Token not provided");
        }
        const tokent = authHeader.split(" ")[1];
        console.log("token ::", tokent);
        const decodedToken = jwt.decode(tokent, "key@123");
        console.log("decodedToken ::", decodedToken);
        if(decodedToken === null){
            return response.status(401).json("Invalid token");
        }
        next();
};
module.exports = auth;