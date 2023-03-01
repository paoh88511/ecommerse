const jwt = require("jsonwebtoken");
const keyscret = "dodo820323";

const generateToken = (id) => {
  return jwt.sign({ id }, keyscret, {
    expiresIn: "10d",
  });
};

module.exports = generateToken;
