import express from "express"
import { loginUser, registerUser } from "../controller/auth.js";
import { fetchQuestions, fetchTests, getUserScores, submitTest } from "../controller/user.js"
import  authCheckMiddleware  from "../middleware/authCheckMiddleware.js";
// import { checkToken } from '../controller/auth.js';

const router = express.Router();    

router.post("/login", loginUser);
router.post("/register", registerUser)
// router.get("/checkuser", checkToken)
router.get("/get-questions/:id",authCheckMiddleware(), fetchQuestions)
router.get("/issued-tests",authCheckMiddleware(),fetchTests)
router.put("/test/submit/:id",authCheckMiddleware(),submitTest)
router.get("/scores",authCheckMiddleware(),getUserScores)
router.get("/checkUser",(req,res)=>{
    res.status(200).json({message:"User Verified"})
})
export default router;