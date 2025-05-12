import jwt from "jsonwebtoken";
import { User } from "../Models/User.model.js";
import ApiError from "../Utils/ApiError.js";
import asyncHandler from "./asyncHandler.js";

export const ClientAuth = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "") || req?.session?.accessToken;

    console.log(req.cookies?.accessToken);

    if (!token) {
        throw new ApiError(401, "Authentication token is missing.");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("decode token", decodedToken);
    } catch (err) {
        console.log("Auth Middleware: ", err.name);
        switch (err.name) {
            case "TokenExpiredError":
                throw new ApiError(401, "JWT TOKEN EXPIRE");
            case "JsonWebTokenError":
                throw new ApiError(401, "Invalid authentication token.");
            default:
                throw new ApiError(500, "Failed to authenticate request.");
        }
    }

    const user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
    );

    console.log(user);

    if (!user) {
        throw new ApiError(401, "Please log in again.");
    }

    req.user = user;
    next();
});
