import User from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
export const signUp = async (req, res, next)=>{
    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password : hashedPassword})
    console.log(newUser)
    try{
        await newUser.save();
        console.log(newUser)
        res.status(201).json({"message": "user created successfully"})
    }
    catch(error){
        next(error)
    }
   
}