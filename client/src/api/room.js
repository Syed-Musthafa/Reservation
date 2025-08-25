import api from "./api";

export const fetchRooms = async () => {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to fetch rooms");
    } else {
      throw new Error("Network error");
    }
  }
};

export const fetchRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch room details");
    }
  }
};

export const createBooking = async (
  room_id,
  from_time,
  to_time,
  booking_date
) => {
  try {
    const response = await api.post("/bookings", {
      room_id,
      from_time,
      to_time,
      booking_date,
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      console.error("Booking Error:", error.response?.data || error.message);
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to create booking");
  }
};

export const getUserBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    console.error(
      "Fetch My Bookings Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch bookings"
    );
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await api.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
  } catch (error) {
    console.error(
      "Cancel Booking Error:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to cancel booking"
    );
  }
};
