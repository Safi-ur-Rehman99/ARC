import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const { email, password, fullName } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please provide a valid email address" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists, please try a different one" });
        }

        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&color=fff`;


        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: avatar,
        });

        try {

            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })
            console.log("Stream user created/updated successfully for user:", fullName);

        } catch (error) {
            console.error("Error upserting Stream user:", error);
        }

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", fullName: newUser.fullName });



    }
    catch (error) {

        res.status(500).json({ message: "Server error, please try again later", error: error.message });

    }

}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
        });
        await user.save();
        res.status(200).json({ message: "User logged in successfully", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Server error, please try again later", error: error.message });
    }
}

export async function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "User logged out successfully" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            const missingFields = [
                !fullName && "fullName",
                !bio && "bio",
                !nativeLanguage && "nativeLanguage",
                !learningLanguage && "learningLanguage",
                !location && "location",
            ].filter(Boolean);

            return res.status(400).json({
                message: "Please provide all required fields",
                missingFields

            });
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                bio,
                nativeLanguage,
                learningLanguage,
                location,
                isOnboarded: true
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || ""
            });
            console.log("Stream user updated successfully for user:", updatedUser.fullName);
        } catch (error) {
            console.error("Error upserting Stream user:", error);
        }
        return res.status(200).json({
            message: "Onboarding completed successfully",
            user: updatedUser,
        });


    } catch (error) {
        return res.status(500).json({ message: "Server error, please try again later", error: error.message });
    }
}