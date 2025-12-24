import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes";

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.use("/api/items", itemRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
