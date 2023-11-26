const { Transaction } = require("../models");

class ControllerTransaction {
  static async addTransaction(req, res, next) {
    const { transaction_no, total_amount, active } = req.body;
    let user_id = req.userData.id;

    try {
      const transaction = await Transaction.create(
        {
          transaction_no,
          total_amount,
          active,
          user_id,
        },
        { returning: true }
      );

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  }

  static async readTransaction(req, res, next) {
    try {
      let data = await Transaction.findAll();

      if (data.length === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerTransaction;
