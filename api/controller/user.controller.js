import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/error.js";
import User from "../model/user.model.js";

export const test = (req, res) => {
  res.json({
    message: "This from API",
  });
};

// update user

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return customErrorHandler(401, "you can only update your account!");
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


// Delete user

export const deleteUser = async (req, res, next)=>{
  if(req.user.id !== req.params.id) next(customErrorHandler(401, 'you can only delete your account'))

  try{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  }
  catch(err){
    next(err)
  }
}