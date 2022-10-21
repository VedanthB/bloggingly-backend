import express from "express";
import { blogCtrl } from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.post("/blog", auth, blogCtrl.createBlog);

router.get("/home/blogs", blogCtrl.getHomeBlogs);

router.get("/blogs/category/:id", blogCtrl.getBlogsByCategory);

router.get("/blogs/user/:id", blogCtrl.getBlogsByUser);

export default router;
