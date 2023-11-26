const router = require("express").Router();
const Controller = require("../controllers/controllerProductCategory");
const { authentication } = require("../middelwares/auth");

router.use(authentication);
router.get("/", Controller.readProductCategory);
router.post("/add", Controller.addProductCategory);
router.put("/:id", Controller.editProductCategory);
router.delete("/:id", Controller.deleteProductCategory);

module.exports = router;
