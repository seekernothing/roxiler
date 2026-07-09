import express from "express";
import authController from "../controller/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";


const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.getMe);
router.patch("/password", authMiddleware, authController.updatePassword);

export default router;