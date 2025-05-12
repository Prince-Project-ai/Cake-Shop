import rateLimit from 'express-rate-limit';
import ApiError from '../Utils/ApiError.js';

export const strictLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // 5 requests per window
    standardHeaders: true, // Send RateLimit headers
    legacyHeaders: false, // Disable X-RateLimit headers
    handler: (req, res, next) => {
        throw new ApiError(
            429,
            'Too many attempts. Please try again after 10 minutes.'
        );
    },
});