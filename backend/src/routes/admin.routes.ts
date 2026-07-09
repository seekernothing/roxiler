import express from "express";
import adminController from "../controller/admin.controller";

const router = express.Router();

router.get("/dashboard", adminController.dashboard);
router.post("/users", adminController.addUser);
router.post("/stores", adminController.addStore);
router.get("/users", adminController.listUsers);
router.get("/stores", adminController.listStores);
router.get("/users/:id", adminController.userDetails);

export default router;