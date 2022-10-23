import express from "express";
import { userCtrl } from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.patch("/user", auth, userCtrl.updateUser);

router.get("/user/:id", userCtrl.getUser);

export default router;
