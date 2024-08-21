// middlewares/detoken.js
const jwt = require('jsonwebtoken');

const detoken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw { message: "Require token" };
    let token = req.headers.authorization.replace("Bearer ", "");
    let data = jwt.verify(token, process.env.TOKEN_KEY);
    req.token = data;
    req.userId = data.id;
    req.userRole = data.role
    next();
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};

module.exports = detoken;
