"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionDetail.belongsTo(models.Transaction, { foreignKey: "transaction_id" });
      TransactionDetail.belongsTo(models.ProductVariant, { foreignKey: "product_variant_id" });
    }
  }
  TransactionDetail.init(
    {
      transaction_id: DataTypes.INTEGER,
      product_variant_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "TransactionDetail",
    }
  );
  return TransactionDetail;
};
