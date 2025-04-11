import express from 'express';
import multer from "multer"

import authCheckMiddleware from "../middleware/authCheckMiddleware.js"

import {
    createTest,
    deleteTest,
    issueTest,
    updateTest,
    viewTest
} from "../controller/admin.js";


const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/create-test", authCheckMiddleware("admin"), upload.single("file"), createTest);
router.get("/view-test", authCheckMiddleware("admin"), viewTest);
router.delete("/delete/:id", authCheckMiddleware("admin"), deleteTest);
router.put("/update/:id", authCheckMiddleware("admin"),upload.single("file"), updateTest);
router.patch("/issue/:id",authCheckMiddleware("admin"), issueTest);

export default router;