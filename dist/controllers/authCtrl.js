"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../config/generateToken");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
const authCtrl = {
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.clearCookie("refreshToken", { path: `/api/refresh_token` });
            return res.json({ msg: "Logged out!" });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    refreshToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rf_token = req.cookies.refreshToken;
            console.log("rf_token", rf_token);
            // if refresh token is not present then prompt user to login
            if (!rf_token)
                return res.status(400).json({ msg: "Please login now!" });
            /*
            if refresh token is  present then verify refresh token,
            if its correct then login and send access token in res
            */
            const decoded = (jsonwebtoken_1.default.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`));
            if (!decoded.id)
                return res.status(400).json({ msg: "Please login now!" });
            const user = yield userModel_1.default.findById(decoded.id).select("-password");
            if (!user)
                return res.status(400).json({ msg: "This account does not exist." });
            const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
            res.json({ msg: "Login Success!", access_token, user });
        }
        catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }),
    googleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id_token } = req.body;
            const verify = yield client.verifyIdToken({
                idToken: id_token,
                audience: `${process.env.MAIL_CLIENT_ID}`,
            });
            const { email, email_verified, name, picture } = (verify.getPayload());
            if (!email_verified)
                return res.status(500).json({ msg: "Email verification failed." });
            const password = email + "your google secret password";
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const user = yield userModel_1.default.findOne({ email });
            if (user) {
                loginUser(user, password, res);
            }
            else {
                const user = {
                    name,
                    email: email,
                    password: passwordHash,
                    avatar: picture,
                    type: "google",
                };
                registerUser(user, res);
            }
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
};
const loginUser = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        const msgError = user.type === "register"
            ? "Password is incorrect."
            : `Password is incorrect. This account was created login with ${user.type}`;
        return res.status(400).json({ msg: msgError });
    }
    const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id });
    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    res.json({
        msg: "Login Success!",
        access_token,
        user: Object.assign(Object.assign({}, user._doc), { password: "" }),
    });
});
const registerUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new userModel_1.default(user);
    yield newUser.save();
    const access_token = (0, generateToken_1.generateAccessToken)({ id: newUser._id });
    const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: newUser._id });
    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: `/api/refresh_token`,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    });
    res.json({
        msg: "Login Success!",
        access_token,
        user: Object.assign(Object.assign({}, newUser._doc), { password: "" }),
    });
});
exports.default = authCtrl;
