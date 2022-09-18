import express from "express";
import authCtrl from "../controllers/authController";
// import { validRegister } from "../middleware/vaild";

const router = express.Router();

router.post("/register", authCtrl.register);

export default router;
