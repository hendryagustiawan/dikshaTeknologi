const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { encodeData } = require("../helpers/jwt");

class ControllerUser {
  static async addUser(req, res, next) {
    let { username, email, password } = req.body;

    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      next({ name: `Email already registered` });
    } else {
      try {
        let data = await User.create(
          {
            username,
            email,
            password,
            role: "admin",
          },
          { returning: true }
        );
        res.status(201).json({ id: data.id, username: data.username, email: data.email, role: data.role });
      } catch (error) {
        next(error);
      }
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    if (!email && !password) {
      next({ name: `Email and Password is required` });
    } else if (!email) {
      next({ name: `Email is required` });
    } else if (!password) {
      next({ name: `Password is required` });
    } else {
      try {
        const data = await User.findOne({ where: { email } });
        const validasi = comparePassword(password, data.password);

        if (data && validasi) {
          let access_token = encodeData({
            id: data.id,
            email: data.email,
            role: data.role,
          });
          res.status(200).json({ access_token });
        } else {
          throw { name: "Invalid User" };
        }
      } catch (error) {
        next(error);
      }
    }
  }
}

module.exports = ControllerUser;
