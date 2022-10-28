"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: "user" },
    title: {
        type: String,
        require: true,
        trim: true,
        minLength: 10,
        maxLength: 50,
    },
    content: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
        minLength: 50,
        maxLength: 200,
    },
    thumbnail: {
        type: String,
        require: true,
    },
    category: { type: mongoose_1.default.Types.ObjectId, ref: "category" },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("blog", blogSchema);
