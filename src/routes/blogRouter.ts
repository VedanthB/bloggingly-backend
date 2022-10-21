import express from "express";
import { blogCtrl } from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);

export default router;
