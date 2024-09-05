import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    if (!username)
      return res
        .status(400)
        .json({ success: false, message: "Username is required" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invlid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        succes: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists !!" });
    }
    const existingUserByUsername = await User.findOne({ username: username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists !!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const PROFILE_PICS = ["../Avatars/Avatar1.png", "../Avatars/Avatar2.png", "../Avatars/Avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in singup controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required !" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email !" });
    }
    const isPasswordCorrect = await bcryptjs.compare(
        password, user.password
      );
    if(!isPasswordCorrect){
        return res
        .status(404)
        .json({ success: false, message: "Incorrect Password !" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-cineshine");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user:req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
