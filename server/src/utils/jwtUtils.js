import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1h"; 

export const signToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// returns decoded payload if valid
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); 
  } catch (err) {
    return null; 
  }
};

export const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};
