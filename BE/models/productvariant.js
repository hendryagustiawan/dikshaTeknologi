"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductVariant.belongsTo(models.Product, { foreignKey: "product_id" });
      ProductVariant.hasMany(models.TransactionDetail, { foreignKey: "product_variant_id" });
    }
  }
  ProductVariant.init(
    {
      product_id: DataTypes.INTEGER,
      code: DataTypes.STRING,
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ProductVariant",
    }
  );
  return ProductVariant;
};
