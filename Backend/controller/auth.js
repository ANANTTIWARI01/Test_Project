// import bcrypt from "bcryptjs"; 
import bcrypt from 'bcrypt';
import "dotenv/config";
import jwt from "jsonwebtoken";
import Admin from "../models/adminLoginModel.js";
import User from "../models/userLoginModel.js"

export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invailid Credentials" })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invailid Credentials" })
        }

        const adminToken = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })

        res.status(200).json({
            message: "Admin logged in Successfully",
            token: adminToken,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        })

    } catch (error) {
        console.log("Login Error", error)
        res.status(500).json({ message: "Server Error", error: error.message })
    }

}

export async function logoutAdmin(req, res) {
    try {
        res.clearCookie("adminToken", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        })
        res.status(200).send({ message: "Logged out" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ mesage: error.message })
    }
}

export async function registerAdmin(req, res) {
    try {
        const { name, email, password } = req.body

        const existingAdmin = await Admin.findOne({ email })
        if (existingAdmin) return res.status(400).json({ message: 'User Already Exist' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        await newAdmin.save()
        res.status(201).json({ message: 'Admin Registered Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in Registering' })

    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password || typeof password !== "string") {
            return res.status(400).json({ message: "Invalid email or password format" });
        }

        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const userToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: "user",
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("userToken", userToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        res.status(200).json({
            message: "User logged in Successfully",
            token: userToken,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Login Error", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'User Already Exist' })

        const hashedPassword = await bcrypt.hash(password, 10)
                                                          
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save()
        res.status(201).json({ message: 'User Registered Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in Registering' })

    }
}
