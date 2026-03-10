const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken)
    return res.status(402).json({ error: "authorization token is required!" });
  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    req.user = decoded._id;
    next();
  } catch (error) {
    res.status(400).json({ error: "unauthorized user!" });
  }
};

module.exports = authenticate;
