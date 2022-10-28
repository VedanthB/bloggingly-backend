"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router
    .route("/category")
    .get(controllers_1.categoryCtrl.getCategories)
    .post(auth_1.default, controllers_1.categoryCtrl.createCategory);
router
    .route("/category/:id")
    .patch(auth_1.default, controllers_1.categoryCtrl.updateCategory)
    .delete(auth_1.default, controllers_1.categoryCtrl.deleteCategory);
exports.default = router;
