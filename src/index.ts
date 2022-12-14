import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routes from "./routes";

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api", routes.authRouter);
app.use("/api", routes.userRouter);
app.use("/api", routes.categoryRouter);
app.use("/api", routes.blogRouter);
app.use("/api", routes.commentRouter);

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
    // "blogs-api": "https://blog-dev-api.herokuapp.com/api/home/blogs",
  });
});

// Database
import "./config/db";

// server listening
const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
