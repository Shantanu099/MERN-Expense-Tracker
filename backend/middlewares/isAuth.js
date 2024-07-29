const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //!Verify the token
  const verifyToken = jwt.verify(token, "shantanuisboss", (err, decoded) => {
    console.log(decoded);
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  if (verifyToken) {
    //!Save the user req object
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token expired, login again");
    next(err);
  }
};

module.exports = isAuthenticated;
