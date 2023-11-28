const { ProductVariant, Product } = require("../models");

class ControllerProductVariant {
  static async addProduct(req, res, next) {
    const { code, image, name, qty, price, active } = req.body;
    const product_id = +req.params.id;

    try {
      const productVariant = await ProductVariant.create(
        {
          product_id,
          code,
          image,
          name,
          qty,
          price,
          active,
        },
        { returning: true }
      );

      res.status(201).json(productVariant);
    } catch (error) {
      next(error);
    }
  }

  static async readProduct(req, res, next) {
    const id = +req.params.id;

    try {
      let data = await ProductVariant.findAll({
        include: [Product],
        where: { product_id: id },
      });

      if (data.length === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    let id = req.params.id;
    let { product_id, code, image, name, qty, price, active } = req.body;

    try {
      const productVariant = await ProductVariant.update({ product_id, code, image, name, qty, price, active }, { where: { id }, returning: true });

      if (productVariant[0] === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(productVariant);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    let id = req.params.id;

    try {
      const productVariant = await ProductVariant.findByPk(id);

      if (!productVariant) {
        throw { name: "Not Found" };
      } else {
        await ProductVariant.destroy({ where: { id } });

        res.status(200).json({ message: `Sukses to delete` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerProductVariant;
