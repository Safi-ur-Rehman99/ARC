import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  const {email, password, fullname } = req.body;
  try {
    if(!email || !password || !fullname){
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({ message: "Please provide a valid email address" });
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ message: "Email already exists, please try a different one" });
    }

    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=random&color=fff`;
    

        const newUser = await User.create({
            fullname,
            email,
            password,
            profilePic: avatar,
        });
    
        const token= jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    


}
    catch(error) {

        res.status(500).json({ message: "Server error, please try again later", error: error.message });

    }

}

export async function login(req, res) {
    res.json({ message: 'Hello from the login endpoint!' });
}

export async function logout(req, res) {
    res.json({ message: 'Hello from the logout endpoint!' });
}