"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
// Middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: `${process.env.BASE_URL}`,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api", routes_1.default.authRouter);
app.use("/api", routes_1.default.userRouter);
app.use("/api", routes_1.default.categoryRouter);
app.use("/api", routes_1.default.blogRouter);
app.use("/api", routes_1.default.commentRouter);
app.get("/", (req, res) => {
    res.json({
        msg: "hello world",
        // "blogs-api": "https://blog-dev-api.herokuapp.com/api/home/blogs",
    });
});
// Database
require("./config/db");
// server listening
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
