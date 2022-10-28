"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/logout", controllers_1.authCtrl.logout);
router.get("/refresh_token", controllers_1.authCtrl.refreshToken);
router.post("/google_login", controllers_1.authCtrl.googleLogin);
exports.default = router;
