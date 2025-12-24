import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes";
import { exceptionFilter } from "./filters/exception.filter";

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.use("/api/items", itemRoutes);

app.use(exceptionFilter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
