import { pool } from "../config/database.js";

const roomController = {
  createRoom: async (req, res) => {
    try {
      const { name, description, room_type } = req.body;

      const [result] = await pool.execute(
        `INSERT INTO rooms (name, description, room_type, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [name, description, room_type]
      );

      res.status(201).json({
        success: true,
        message: "Room created successfully",
        data: {
          id: result.insertId,
          name,
          description,
          room_type,
          created_at: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Error creating room:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  getAllRooms: async (req, res) => {
    try {
      const [rooms] = await pool.execute("SELECT * FROM rooms");

      res.status(200).json({
        success: true,
        data: rooms,
      });
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  getRoomById: async (req, res) => {
    try {
      const { id } = req.params;

      const [[room]] = await pool.execute("SELECT * FROM rooms WHERE id = ?", [
        id,
      ]);

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "Room not found",
        });
      }

      res.status(200).json({
        success: true,
        data: room,
      });
    } catch (error) {
      console.error("Error fetching room:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export { roomController };
