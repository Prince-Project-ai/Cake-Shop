class ApiError extends Error {
    constructor(statusCode, message = "some thing went wrong", errors = [], stack) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        if (this.stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;