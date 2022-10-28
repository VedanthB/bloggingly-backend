"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCtrl = exports.blogCtrl = exports.categoryCtrl = exports.userCtrl = exports.authCtrl = void 0;
const authCtrl_1 = __importDefault(require("./authCtrl"));
exports.authCtrl = authCtrl_1.default;
const userCtrl_1 = __importDefault(require("./userCtrl"));
exports.userCtrl = userCtrl_1.default;
const categoryCtrl_1 = __importDefault(require("./categoryCtrl"));
exports.categoryCtrl = categoryCtrl_1.default;
const blogCtrl_1 = __importDefault(require("./blogCtrl"));
exports.blogCtrl = blogCtrl_1.default;
const commentCtrl_1 = __importDefault(require("./commentCtrl"));
exports.commentCtrl = commentCtrl_1.default;
