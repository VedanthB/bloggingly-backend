"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post("/blog", middleware_1.auth, controllers_1.blogCtrl.createBlog);
router.get("/home/blogs", controllers_1.blogCtrl.getHomeBlogs);
router.get("/blogs/category/:id", controllers_1.blogCtrl.getBlogsByCategory);
router.get("/blogs/user/:id", controllers_1.blogCtrl.getBlogsByUser);
router.get("/blog/:id", controllers_1.blogCtrl.getBlog);
router.get("/search/blogs", controllers_1.blogCtrl.searchBlogs);
router
    .route("/blog/:id")
    .get(controllers_1.blogCtrl.getBlog)
    .put(middleware_1.auth, controllers_1.blogCtrl.updateBlog)
    .delete(middleware_1.auth, controllers_1.blogCtrl.deleteBlog);
exports.default = router;
