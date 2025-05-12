import ApiError from "../Utils/ApiError.js";

const errorHandler = (err, _, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    if (err instanceof ApiError) {
        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
            errors: err.errors,
            stack: err.stack,
        });
    } else {
        return res.status(statusCode).json({
            success: false,
            message: errorMessage,
            stack: err.stack,
        });
    }
}

export default errorHandler;