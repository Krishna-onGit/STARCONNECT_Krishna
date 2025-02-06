import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // Check if the token is in the Authorization header (optional, but recommended)
        // if (!token && req.headers.authorization) {
        //     const authHeader = req.headers.authorization;
        //     if (authHeader.startsWith("Bearer ")) {
        //         token = authHeader.split(" ")[1];
        //     }
        // }
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;