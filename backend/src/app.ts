import express from "express";
import authRouter from "./routes/auth.routes";


const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);



app.get("/", (req, res) => {
  res.json({ message: "Store Rating API running" });
});

export default app;