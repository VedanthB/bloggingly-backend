import express from "express";
import { blogCtrl } from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);

router.get("/home/blogs", blogCtrl.getHomeBlogs);

export default router;
