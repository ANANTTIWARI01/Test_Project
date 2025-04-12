import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

// const authCheckMiddleware = (req, res, next) => {
//     try {

//         const token = req.cookies.token ;
//         console.log(req)

//         if (!token) {
//             console.log("token missing");
//             return res.status(401).json({ message: "No token provided" });
//         }
//         console.log("token received");
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded user:", decoded);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(402).json({ message: "Invalid or expired token" });
//     }
// };



const authCheckMiddleware = (tokenKey) => (req, res, next) => {
    const token = tokenKey === "admin" ? req.cookies.adminToken : req.cookies.userToken
    if (!token) {
        console.log("token missing");
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        // console.log("token received");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded user:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(402).json({ message: "Invalid or expired token" });
    }
}
export default authCheckMiddleware;