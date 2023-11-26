const router = require("express").Router();
const Controller = require("../controllers/controllerProduct");
const { authentication } = require("../middelwares/auth");

router.use(authentication);
router.get("/", Controller.readProduct);
router.post("/add", Controller.addProduct);
router.put("/:id", Controller.editProduct);
router.delete("/:id", Controller.deleteProduct);

module.exports = router;
