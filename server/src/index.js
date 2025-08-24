import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

// Routes
import userRouter from "./routes/userRouter.js";
import roomRouter from "./routes/roomRouter.js";
import bookingRouter from "./routes/bookingRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/users", userRouter);
app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);

// error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
