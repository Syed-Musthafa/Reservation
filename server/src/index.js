import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Routes
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);

// error handler
app.use((error, req, res, next) => {
  console.log("error", error);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
