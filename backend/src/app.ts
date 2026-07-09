import express from "express";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors"
import errorHandler from "./middlewares/error.middleware";



const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRouter);



app.get("/", (req, res) => {
  res.json({ message: "Store Rating API running" });
});

app.use(errorHandler);



export default app;