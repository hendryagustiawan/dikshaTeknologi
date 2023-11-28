const router = require("express").Router();
const Controller = require("../controllers/controllerProductVariant");
const { authentication } = require("../middelwares/auth");

router.use(authentication);
router.get("/:id", Controller.readProduct);
router.post("/add/:id", Controller.addProduct);
router.put("/:id", Controller.editProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
