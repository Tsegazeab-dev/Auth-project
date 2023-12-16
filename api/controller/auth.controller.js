import { customErrorHandler } from "../utils/error.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customErrorHandler(404, "user not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log(password);
    console.log(validUser.password);
    if (!validPassword)
      return next(customErrorHandler(401, "Invalid credentials"));

    const { password: hashedPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const {name, email, picture} = req.body
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token  = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
      const {password : hashedPassword, ...rest} = user._doc
      const expiryDate = new Date(Date.now() + 3600000)
      res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)
    }
    else{
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const username = name.split(' ')[0].toLowerCase() + Math.floor(Math.random() * 10000)
      const newUser = new User({username, email, password: hashedPassword, profilePicture: picture})

      await newUser.save();

      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);

      const {password: hashed, ...rest} = newUser

      const expiryDate = new Date(Date.now() + 3600000)
      res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest)

    }
  } catch (err) {
    next(err)
  }
  
};
