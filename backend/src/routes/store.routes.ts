import express from "express";
import storeController from "../controller/store.controller";
import checkRole from "../middlewares/role.middleware";

const router = express.Router();

router.get("/", checkRole("USER"), storeController.listForUser);

export default router;