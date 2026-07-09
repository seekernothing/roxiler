import express from "express";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import errorHandler from "./middlewares/error.middleware";
import authMiddleware from "./middlewares/auth.middleware";
import checkRole from "./middlewares/role.middleware";
import adminRouter from "./routes/admin.routes";
import storeRouter from "./routes/store.routes";
import ratingRouter from "./routes/rating.routes";






const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRouter);
app.use("/api/admin", authMiddleware, checkRole("ADMIN"), adminRouter);
app.use("/api/stores", authMiddleware, storeRouter);
app.use("/api/rating", authMiddleware, ratingRouter);







app.get("/", (req, res) => {
  res.json({ message: "Store Rating API running" });
});

app.use(errorHandler);



export default app;