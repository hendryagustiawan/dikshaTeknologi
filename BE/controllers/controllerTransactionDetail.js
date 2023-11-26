const { TransactionDetail, Transaction, ProductVariant } = require("../models");

class ControllerTransactionDetail {
  static async addTransactionDetail(req, res, next) {
    const { product_variant_id, qty, price, subtotal, active } = req.body;
    const transaction_id = +req.params.id;

    try {
      const transactionDetail = await TransactionDetail.create(
        {
          transaction_id,
          product_variant_id,
          qty,
          price,
          subtotal,
          active,
        },
        { returning: true }
      );

      res.status(201).json(transactionDetail);
    } catch (error) {
      next(error);
    }
  }

  static async readTransactionDetail(req, res, next) {
    try {
      let data = await TransactionDetail.findAll({ include: [Transaction, ProductVariant] });

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

module.exports = ControllerTransactionDetail;
