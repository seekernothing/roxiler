import express from "express";
import ratingController from "../controller/rating.controller";
import checkRole from "../middlewares/role.middleware";

const router = express.Router();

router.post("/:storeId", checkRole("USER"), ratingController.setRating);

export default router;