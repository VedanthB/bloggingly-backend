import express from "express";
import { authCtrl } from "../controllers";

import { validRegister } from "../middleware";

const router = express.Router();

router.post("/register", validRegister, authCtrl.register);

export default router;
