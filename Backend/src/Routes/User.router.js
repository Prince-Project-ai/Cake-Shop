import express from 'express';
import passport from 'passport';

import {
    clientCurrentAuth,
    googleSignIn,
    logoutClient,
    refreshAccessToken,
    resetPassword,
    signUpUser,
    userSignIn,
    verifyEmail,
    verifyOtp
} from '../Controllers/User.controller.js';

import { ClientAuth } from '../Middlewares/ClientAuth.middleware.js';
import { strictLimiter } from '../Middlewares/LoginRateLimitor.middleware.js';


const router = express.Router();

// 🚀 Start Google OAuth
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
}));

// 🔁 Google OAuth Callback
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/sign-in',
        session: false,
    }), googleSignIn
);


router.post("/sign-up", signUpUser);
router.post("/sign-in", strictLimiter, userSignIn);
router.get("/client-current-auth", ClientAuth, clientCurrentAuth);
router.post("/refresh-access-token", ClientAuth, refreshAccessToken);
router.post("/logout-client", ClientAuth, logoutClient);


router.post("/verify-email", verifyEmail);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
