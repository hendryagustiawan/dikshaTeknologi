const { Product, ProductCategory } = require("../models");

class ControllerProduct {
  static async addProduct(req, res, next) {
    const { name, plu, active, product_category_id } = req.body;

    try {
      const product = await Product.create(
        {
          name,
          plu,
          active,
          product_category_id,
        },
        { returning: true }
      );

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async readProduct(req, res, next) {
    try {
      let data = await Product.findAll({ include: [ProductCategory] });

      if (data.length === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let id = req.params.id;
    let { name, plu, active, product_category_id } = req.body;

    try {
      const product = await Product.update({ name, plu, active, product_category_id }, { where: { id }, returning: true });

      if (product[0] === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    let id = req.params.id;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        throw { name: "Not Found" };
      } else {
        await Product.destroy({ where: { id } });

        res.status(200).json({ message: `Sukses to delete` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerProduct;
