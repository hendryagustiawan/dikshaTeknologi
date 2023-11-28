const { User } = require("../models");
const { decodeData } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Token Required" };
    } else {
      const decode = decodeData(access_token);

      req.userData = decode;

      User.findByPk(req.userData.id)
        .then((user) => {
          if (user) {
            next();
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  } catch (error) {
    next(error);
  }
};

const authorizationn = async (req, res, next) => {
  try {
    const role = req.userData.role;

    if (role === "admin") {
      // bisa mengakses ke routingan selanjutnya
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
  authorizationn,
};
