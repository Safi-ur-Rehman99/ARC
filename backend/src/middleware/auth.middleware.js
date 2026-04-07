import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protectedRoute(req, res, next) {
try {
    const token= req.cookies.jwt
    if(!token){
        return res.status(401).json({ message: "Unauthorized, token missing" });
    }
    const decoded= jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({ message: "Unauthorized, user not found" });
    }
    req.user = user;

    next();
} catch (error) {

    return res.status(401).json({ message: "Unauthorized, invalid token" }); 
}
}