import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorize - Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET || "sadiya");
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Internal Server Error - ${error}` });
  }
};

export default authMiddleware;
 