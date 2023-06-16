const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "No Authorization Header" });
    }
    console.log(authorization);
    const bearer = authorization.split(" ")[0];
    let token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    const decodedToken = jwt.verify(token, config.get("secret"));
    console.log(decodedToken);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Invalid Token" });
  }
};
