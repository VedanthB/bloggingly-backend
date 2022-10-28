"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const blogRouter_1 = __importDefault(require("./blogRouter"));
const commentRouter_1 = __importDefault(require("./commentRouter"));
const routes = {
    authRouter: authRouter_1.default,
    userRouter: userRouter_1.default,
    categoryRouter: categoryRouter_1.default,
    blogRouter: blogRouter_1.default,
    commentRouter: commentRouter_1.default,
};
exports.default = routes;
