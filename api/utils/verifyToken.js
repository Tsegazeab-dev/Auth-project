import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token
    if(!token){
        return next(customErrorHandler(401, 'you are not authenticated'))
    }
    
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err) return next(customErrorHandler(403, 'Token is not valid'));
        req.user = user;
        next();
    })
}