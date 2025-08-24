import { pool } from '../config/database.js';
import { decodeToken, signToken} from '../utils/jwtUtils.js';

const userController = {

  registerUser: async (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Business logic: Check if email already exists (uncomment when DB is ready)
      // const [existingUsers] = await pool.execute(
      //   'SELECT id FROM users WHERE email = ?',
      //   [email]
      // );
      
      // if (existingUsers.length > 0) {
      //   return res.status(409).json({
      //     success: false,
      //     message: 'Email already exists'
      //   });
      // }
      
      // Insert new user (uncomment when DB is ready)
      // const [result] = await pool.execute(
      //   'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      //   [name, email, age]
      // );

      const accessToken = signToken({ userId : 123})

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          // id: result.insertId,
          accessToken,
          name,
          email,
          age: age || null,
          created_at: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },

  loginuser : async (req, res) => {
    try {
      const { name, email, age } = req.body;
      
      // Business logic: Check if email already exists (uncomment when DB is ready)
      // const [existingUsers] = await pool.execute(
      //   'SELECT id FROM users WHERE email = ?',
      //   [email]
      // );
      // 
      // if (existingUsers.length > 0) {
      //   return res.status(409).json({
      //     success: false,
      //     message: 'Email already exists'
      //   });
      // }
      
      // Insert new user (uncomment when DB is ready)
      // const [result] = await pool.execute(
      //   'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      //   [name, email, age]
      // );

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          // id: result.insertId,
          id: Math.floor(Math.random() * 1000), // Temporary ID for demo
          name,
          email,
          age: age || null,
          created_at: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

};

export { userController} ;