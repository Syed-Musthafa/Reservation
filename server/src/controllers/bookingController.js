import { pool } from "../config/database.js";
import { compareTime } from "../utils/timeUtils.js";

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const { room_id, from_time, to_time, booking_date } = req.body;
      const { id: user_id } = req.user;

      const invalidTimeRange = compareTime(from_time, to_time);
      if (invalidTimeRange) {
        return res.status(400).json({
          success: false,
          message: "From time must be less than To time",
        });
      }

      // Check previous booking
      const existingBookings = await checkExistingBooking(
        room_id,
        booking_date,
        to_time,
        from_time
      );

      if (existingBookings) {
        return res.status(400).json({
          success: false,
          message: "There is a booking that overlaps with this time slot.",
        });
      }

      const [result] = await pool.execute(
        `INSERT INTO bookings (room_id, user_id, from_time, to_time, booking_date, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())`,
        [room_id, user_id, from_time, to_time, booking_date]
      );

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: {
          id: result.insertId,
        },
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  getAllBookings: async (req, res) => {
    const { id: user_id } = req.user;
    try {
      const [bookings] = await pool.execute(
        `
        SELECT * FROM bookings WHERE user_id = ?
        ORDER BY booking_date DESC, from_time ASC
      `,
        [user_id]
      );

      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;

      const [[booking]] = await pool.execute(
        "SELECT * FROM bookings WHERE id = ?",
        [id]
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const { from_time, to_time, booking_date } = req.body;
      const { id: user_id } = req.user;

      const [[booking]] = await pool.execute(
        `SELECT * FROM bookings WHERE id = ? AND user_id = ?`,
        [id, user_id]
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Invalid Booking",
        });
      }

      // Check previous booking
      const existingBookings = await checkExistingBooking(
        booking.room_id,
        booking_date,
        to_time,
        from_time,
        booking.id
      );

      if (existingBookings) {
        return res.status(400).json({
          success: false,
          message: "There is a booking that overlaps with this time slot.",
        });
      }

      const [result] = await pool.execute(
        `UPDATE bookings
         SET from_time = ?, to_time = ?, booking_date = ?, updated_at = NOW()
         WHERE id = ?`,
        [from_time, to_time, booking_date, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Booking not found or nothing changed",
        });
      }

      res.status(200).json({
        success: true,
        message: "Booking updated successfully",
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;

      const [result] = await pool.execute(
        `UPDATE bookings
         SET status = 0, updated_at = NOW()
         WHERE id = ?`,
        [id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Booking not found or already cancelled",
        });
      }

      res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
      });
    } catch (error) {
      console.error("Error cancelling booking:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

const checkExistingBooking = async (
  room_id,
  booking_date,
  to_time,
  from_time,
  booking_id
) => {
  // Check previous booking
  let query = `SELECT * FROM bookings 
          WHERE room_id = ? 
            AND booking_date = ? 
            AND status = 1
            AND from_time < ? AND to_time > ? `;

  const args = [room_id, booking_date, to_time, from_time];
  if (booking_id) {
    query += ` AND id != ?`;
    args.push(booking_id);
  }

  const [existingBookings] = await pool.execute(query, args);

  if (existingBookings.length > 0) return true;
  return false;
};

export { bookingController };
