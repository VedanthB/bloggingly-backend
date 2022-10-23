import express from "express";
import { authCtrl } from "../controllers";

const router = express.Router();

router.get("/logout", authCtrl.logout);

router.get("/refresh_token", authCtrl.refreshToken);

router.post("/google_login", authCtrl.googleLogin);

export default router;
