import express from "express";
import { authCtrl } from "../controllers";

import { validRegister } from "../middleware";

const router = express.Router();

router.post("/register", validRegister, authCtrl.register);

router.post("/active", authCtrl.active);

router.post("/login", authCtrl.login);

router.get("/logout", authCtrl.logout);

router.get("/refresh_token", authCtrl.refreshToken);

export default router;
