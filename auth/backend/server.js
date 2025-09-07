import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(morgan("combined"));

app.use("/auth", authRoutes);

app.get("/health", (req, res) => res.json({ status: "ok", service: "auth-service" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
