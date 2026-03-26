import  jwt from "jsonwebtoken"

export const genrateToken=async(user_id,res)=>{
const token = jwt.sign({ id: user_id }, process.env.JWT_SECRETE, {
  expiresIn: "7d",
});

res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  return token;}