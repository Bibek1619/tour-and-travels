const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Get authorization header
    let token = req.headers.authorization;

    // 2. Check if token exists and starts with "Bearer "
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // 3. Extract token value
    token = token.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //this return the payload we set during signing the token
    {/*id:user if exp date and set date*/}

    // 5. Check decoded token
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // 6. Find user from database
    req.user = await User.findById(decoded.id).select("-password");

    // 7. If user does not exist
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 8. Allow request to continue
    next();
  } catch (err) {
    console.error("Error in auth middleware:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
