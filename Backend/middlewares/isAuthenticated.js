import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        let token = req.cookies.token; // Declare with let to allow reassignment

        // Check if token is in Authorization header (Bearer Token)
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decoded.userId; // Attach user ID to request object
        next(); // Move to next middleware
    } catch (error) {
        console.error("Authentication Error:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

export default isAuthenticated;
