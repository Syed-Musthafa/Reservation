
-- USers
CREATE TABLE reservation_db.users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at TIMESTAMP NULL,
	updated_at TIMESTAMP NULL
)

CREATE TABLE reservation_db.rooms (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  room_type ENUM('MEETING_HALL', 'ROOM') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE reservation_db.bookings (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  user_id INT NOT NULL,
  from_time TIME NOT NULL,
  to_time TIME NOT NULL,
  booking_date DATE NOT NULL,
  status TINYINT DEFAULT 1, -- 1 = Active, 0 = Cancelled (you can define your own status codes)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Foreign Key Constraints
  CONSTRAINT fk_bookings_room FOREIGN KEY (room_id) REFERENCES reservation_db.rooms(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES reservation_db.users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

