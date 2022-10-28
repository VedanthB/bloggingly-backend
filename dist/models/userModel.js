"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Your name is up to 20 chars long."],
    },
    email: {
        type: String,
        required: [true, "Please add your email "],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
    },
    role: {
        type: String,
        default: "user", // admin
    },
    type: {
        type: String,
        default: "register", // login
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/supertramp69420/image/upload/v1663477807/default-avatar_cpjl9n.jpg",
    },
});
exports.default = mongoose_1.default.model("user", userSchema);
