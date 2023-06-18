const jwt = require("jsonwebtoken");
const config = require("config");
const myJwt = require("../services/JwtService");

module.exports = async function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "No Authorization Header" });
    }
    // console.log(authorization);
    const bearer = authorization.split(" ")[0];
    let token = authorization.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    const [err, decodedToken] = await to(
      // jwt.verify(token, config.get("secret"))
      myJwt.verifyAccess(token)
    );
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    // console.log(decodedToken);
    next();
  } catch (error) {
    return res.status(500).send({ message: "Invalid Token" });
  }
};

async function to(promise) {
  return promise
    .then((response) => [null, response])
    .catch((err) => [err, null]);
}
