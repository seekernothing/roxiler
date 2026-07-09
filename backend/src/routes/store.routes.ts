import express from "express";
import storeController from "../controller/store.controller";
import checkRole from "../middlewares/role.middleware";

const router = express.Router();

router.get("/", checkRole("USER"), storeController.listForUser);
router.get("/owner/dashboard", checkRole("OWNER"), storeController.ownerDashboard);

export default router;