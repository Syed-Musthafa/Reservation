import { pool } from "../config/database.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwtUtils.js";

const userController = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const [existingUsers] = await pool.execute(
        "SELECT id FROM users WHERE email = ?",
        [email]
      );

      if (existingUsers.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      // Password Encryption
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Insert new user (uncomment when DB is ready)
      const [result] = await pool.execute(
        "INSERT INTO users (name, email,password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
        [name, email, hash]
      );

      const accessToken = signToken({ userId: result.insertId });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: {
          id: result.insertId,
          accessToken,
          name,
          email,
          created_at: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  loginuser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const [[user]] = await pool.execute(
        "SELECT id,email,password,name FROM users WHERE email = ?",
        [email]
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email or Password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const accessToken = signToken({ userId: user.id });

      res.status(201).json({
        success: true,
        message: "Login successfully",
        accessToken,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.error("Error login user:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export { userController };
