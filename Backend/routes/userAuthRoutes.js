import express from "express"
import { loginUser, registerUser } from "../controller/auth.js";
import { fetchQuestions, fetchTests, getUserScores, submitTest } from "../controller/user.js"
import  authCheckMiddleware  from "../middleware/authCheckMiddleware.js";
// import { checkToken } from '../controller/auth.js';

const router = express.Router();    

router.post("/login", loginUser);
router.post("/register", registerUser)
// router.get("/checkuser", checkToken)
router.get("/get-questions/:id",authCheckMiddleware("user"), fetchQuestions)
router.get("/issued-tests",authCheckMiddleware("user"),fetchTests)
router.put("/test/submit/:id",authCheckMiddleware("user"),submitTest)
router.get("/scores",authCheckMiddleware("user"),getUserScores)
router.get("/checkUser",(req,res)=>{
    res.status(200).json({message:"User Verified"})
})
// router.get("/test/check/:id",authCheckMiddleware("user"),checkTestAttempt)
export default router;