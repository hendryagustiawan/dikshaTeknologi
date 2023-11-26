const { User, Accommodation } = require("../models");
const { decodeData } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      // jika token kosong
      throw { name: "Token Required" };
    } else {
      const decode = decodeData(access_token);

      req.userData = decode; // untuk simpan data Access Token (id, email, role)

      User.findByPk(req.userData.id)
        .then((user) => {
          if (user) {
            // jika id user sesuai/ditemukan maka bisa akses
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

// authorization for accomodation
const authorization = async (req, res, next) => {
  try {
    const role = req.userData.role;

    if (role === "admin") {
      // bisa mengakses ke routingan selanjutnya
      next();
    } else {
      const id = req.params.id;

      const accommodation = await Accommodation.findByPk(id);

      // jika data kosong
      if (!accommodation) throw { name: "Not Found" };
      // untuk hendel user hanya bisa akses sesuai id nya saja
      if (req.userData.id !== accommodation.UserId) throw { name: "Forbidden" };
      // jika role staff dan id yang di akses benar
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authentication,
  authorization,
};
