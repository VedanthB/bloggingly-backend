"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = exports.generateActiveToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateActiveToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.ACTIVE_TOKEN_SECRET}`, {
        expiresIn: "5m",
    });
};
exports.generateActiveToken = generateActiveToken;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "15m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, {
        expiresIn: "30d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
