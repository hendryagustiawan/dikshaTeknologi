const { ProductCategory } = require("../models");

class ControllerProductCategory {
  static async addProductCategory(req, res, next) {
    const { name, active } = req.body;

    try {
      const productCategory = await ProductCategory.create(
        {
          name,
          active,
        },
        { returning: true }
      );

      res.status(201).json(productCategory);
    } catch (error) {
      next(error);
    }
  }

  static async readProductCategory(req, res, next) {
    try {
      let data = await ProductCategory.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editProductCategory(req, res, next) {
    let id = req.params.id;
    let { name, active } = req.body;

    try {
      const productCategory = await ProductCategory.update({ name, active }, { where: { id }, returning: true });

      if (productCategory[0] === 0) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json(productCategory);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProductCategory(req, res, next) {
    let id = req.params.id;

    try {
      const productCategory = await ProductCategory.findByPk(id);

      if (!productCategory) {
        throw { name: "Not Found" };
      } else {
        await ProductCategory.destroy({ where: { id } });

        res.status(200).json({ message: `Sukses to delete` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerProductCategory;
