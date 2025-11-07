import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../models/user.model.js";
import { success, failure } from "../response.js";
import { Op } from "sequelize"; 

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return failure(res, 400, "User already exists")
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPass });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: '🎉 Welcome to ExpenseVision!',
            text: `You’ve officially joined ExpenseVision . Good luck with tracking your expenses and budgeting  `,
        };

        await transporter.sendMail(mailOptions);

        return success(res, 201, 'User created successfully', { user });
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', success: false });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return failure(res, 400, "Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return failure(res, 400, "Invalid credentials");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.status(200).json({
            user, token,
            message: "Login successfull",
            success: true
        });
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};



export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const user = await User.findOne({ where: { email } });
        if (!user) return failure(res, 404, "User not found");

        const token = crypto.randomBytes(32).toString("hex");
        const expiry = Date.now() + 1000 * 60 * 5;

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html: `
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 5 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return success(res, 200, 'Reset link sent to your email');
    } catch (err) {
        return failure(res, 500, 'Something went wrong while sending reset link');
    }
};


export const resetPassword = async (req, res) => {
    const {token } = req.query;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiry: { [Op.gt]: Date.now() },
            },
        });

        if (!user) {
            console.log("not user");
            
            return failure(res, 400, "Token is invalid or expired");
        }

        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        return success(res, 200, "Password reset successfully");
    } catch (err) {
        console.log(err);
        return failure(res, 500, "Something went wrong while resetting password");
    }
};