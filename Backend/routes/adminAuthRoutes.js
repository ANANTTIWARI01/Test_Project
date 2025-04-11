import express from "express";
const router = express.Router();
import { loginAdmin, logoutAdmin,registerAdmin } from "../controller/auth.js";
import  authCheckMiddleware  from "../middleware/authCheckMiddleware.js";


router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/register", registerAdmin);
router.get("/check", authCheckMiddleware("admin"),(req,res)=>res.send({message:"Access Granted"}))

export default router;
