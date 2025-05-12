import jwt from "jsonwebtoken";
import asyncHandler from "../Middlewares/asyncHandler.js";
import { User } from "../Models/User.model.js";
import ApiError from "../Utils/ApiError.js";
import ApiResponse from "../Utils/ApiResponse.js";

import nodemailer from "nodemailer";

const COOKIE_OPTIONS = {
    secure: true,
    httpOnly: true,
}

const OTP_GENERATOR = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        OTP += chars[randomIndex];
    }
    return OTP;
}


// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_MAIL, // Replace with your email
        pass: process.env.NODEMAILER_MAIL_PASSWORD // Replace with your email password
    }
});


export const genetateAccessTokenAndRefreshToken = async (user, next) => {
    try {
        const newAccessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        await User.findByIdAndUpdate(
            user._id,
            { refreshToken: newRefreshToken },
            { new: true, runValidators: false } // `new: true` returns the updated document
        );

        return { newAccessToken, newRefreshToken };
    } catch (error) {
        next(new ApiError(
            error?.statusCode || 500,
            error?.message || "Something went wrong while generating access and refresh tokens"
        ));
    }
};

export const signUpUser = asyncHandler(async (req, res) => {
    const { fullName, email, phoneNumber, password } = req.body;

    if (!fullName || !email || !phoneNumber || !password) {
        throw new ApiError(400, "Please fill all the fields.");
    }

    const userExist = await User.findOne({ email }).select("_id");
    if (userExist) {
        throw new ApiError(401, "User already exists.");
    }

    const defaultAvatarUrl =
        "https://res.cloudinary.com/duto9uwjs/image/upload/v1737528548/PropertyFy/profile_imgs/wjlbupipguv7c2ucesdb.jpg";

    const newUser = await User.create({
        fullName,
        email,
        phoneNumber,
        password,
        avatar: defaultAvatarUrl,
    });

    const createdUser = await User.findById(newUser?._id).select("-password");
    if (!createdUser) {
        throw new ApiError(400, "User not registered");
    }

    res
        .status(201)
        .json(new ApiResponse(201, "Registration successful", { user: createdUser }));
});

export const userSignIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Please fill all the fields.");
    }

    const user = await User.findOne({ email: email });

    if (!user) throw new ApiError(401, "Invalid Credentials.");

    if (user?.authProvider === "google") throw new ApiError(400, "This Email is Register with google. Please use Manual Login");

    if (!user?.password) throw new ApiError(400, "No password set for this account. Please use Google Sign-In.");

    const isValidatePassword = user.isPasswordCorrect(password);

    if (!isValidatePassword) throw new ApiError(401, "Invalid Credentials.");

    const { newAccessToken, newRefreshToken } = await genetateAccessTokenAndRefreshToken(user);

    const loggedUser = await User.findById(user?._id).select("-password -refreshToken");

    res
        .status(200)
        .cookie("accessToken", newAccessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
        .json(new ApiResponse(200, "Login Successfully.", { currentAuth: loggedUser }));
});


export const googleSignIn = asyncHandler(async (req, res) => {

    const accessToken = jwt.sign(
        { _id: req.user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { _id: req.user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true, // Use true in production
        sameSite: 'Lax',
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // Use true in production
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Redirect to the front-end with success
    res.redirect('http://localhost:5173');

});


export const clientCurrentAuth = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userData = await User.findById(_id).select("-refreshToken -password");
    if (!userData) throw new ApiError(404, "User not Found");
    res
        .status(200)
        .json(new ApiResponse(200, "User Authenticated", userData));
});

export const logoutClient = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: null,
            },
        },
        {
            new: true,
        }
    );
    res
        .status(200)
        .clearCookie("accessToken", COOKIE_OPTIONS)
        .clearCookie("refreshToken", COOKIE_OPTIONS)
        .json(new ApiResponse(200, {}, "Logout successfully."));
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const inCommingRefreshToken = req?.cookie?.refreshToken;

    if (!inCommingRefreshToken) throw new ApiError(401, "unAuthorized Request.");

    const decodeRefreshToken = jwt.verify(inCommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodeRefreshToken._id);

    if (!user) throw new ApiError(404, "unAuthorized Request.");

    if (inCommingRefreshToken !== user.refreshToken) throw new ApiError(401, "unAuthorized Request.");

    const { newAccessToken, newRefreshToken } = genetateAccessTokenAndRefreshToken(user);

    res
        .status(200)
        .cookie("accessToken", newAccessToken, COOKIE_OPTIONS)
        .cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
        .json(new ApiResponse(200, {}, "Token Refresh Successfully."));
});

export const verifyEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) throw new ApiError(401, "please fill the email.");

    const user = await User.findOne({ email }).select("+_id +authProvider");

    if (user?.authProvider === "google") throw new ApiError(401, "email is sign in with google.");

    console.log(user);

    if (!user) throw new ApiError(404, "If this email is registered, you will receive an email with further instructions.");

    const OTP = OTP_GENERATOR(6);

    user.otp = OTP;
    user.otpExpiry = new Date(Date.now() + 1000 * 60 * 5);
    await user.save();

    // Email options
    const mailOptions = {
        from: `"Cake Shop Team" <${process.env.NODEMAILER_MAIL}>`, // Sender name and email
        to: email, // Recipient
        subject: '🔐 Password Reset OTP - Cake Shop',
        text: `Hello,

        You requested to reset your password. Here is your OTP code:

        OTP: ${OTP}

        If you did not request this, please ignore this email.

        Thanks,
        Cake Shop Team`,
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>You requested to reset your password. Please use the OTP below:</p>
            <p style="font-size: 22px; font-weight: bold;">OTP: ${OTP}</p>
            <p>If you did not request this, please ignore this email.</p>
            <br/>
            <p>Thanks,<br/><strong>Cake Shop Team</strong></p>
        </div>
    `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new ApiError(500, "Failed to send email. Please try again.");
        }
    });

    res.
        status(200)
        .json(new ApiResponse(200, {}, "Message Sent"));
});



export const verifyOtp = asyncHandler(async (req, res) => {
    const { otp, email } = req.body;

    if (!(otp || email)) throw new ApiError(401, "please provide required firld.");

    const user = await User.findOne({ otp, email });

    if (!user) throw new ApiError(400, "Invalid OTP");

    if (user.otpExpiry < new Date()) throw new ApiError(400, "OTP expired");

    // OTP is valid
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "OTP verified. You can now reset your password"));
});


export const resetPassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    if (!(email || newPassword)) throw new ApiError(401, "please provide required firld.");

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(404, "User not found");

    user.password = newPassword; // Hash inside pre-save hook
    await user.save();

    res.status(200).json(new ApiResponse(200, {}, "Password reset successful"));
});