import { User } from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// register
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const files = req.files;
    const fileUri = getDataUri(req.files.profilePhoto[0]);
    const cloudResponse= await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User alerady exits with this email",
        success: false,
      });
    }
    const hasehedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hasehedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res.status(201).json({
      message: "Accoutn created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    //check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        message: "Account doesn't exits with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await JWT.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Corrected spelling here
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
// LOGOUT
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// Profile updating
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    let skillsArry = skills ? skills.split(",") : user.profile.skills;

    console.log("Received Files:", req.files);

    if (req.files) {
      // Handle profile photo upload
      if (req.files.profilePhoto && req.files.profilePhoto.length > 0) {
        console.log("Uploading profile photo...");
        const fileUri = getDataUri(req.files.profilePhoto[0]); // Access first file
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        user.profile.profilePhoto = cloudResponse.secure_url;
      }

      // Handle resume upload
      if (req.files.resume && req.files.resume.length > 0) {
        console.log("Uploading resume...");
        const resumeUri = getDataUri(req.files.resume[0]); // Access first file
        const resumeUpload = await cloudinary.uploader.upload(resumeUri.content, {
          resource_type: "raw",
           format: "pdf",
           folder:"resumes",
        });
        console.log("Resume uploaded:", resumeUpload);
        user.profile.resume = resumeUpload.secure_url;
        user.profile.resumeOriginalName = req.files.resume[0].originalname;
      }
    }

    // Update user fields
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills = skillsArry;

    await user.save();

    return res.status(200).json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.log("Error updating profile:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

