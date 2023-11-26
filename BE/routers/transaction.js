const router = require("express").Router();
const Controller = require("../controllers/controllerTransaction");
const { authentication } = require("../middelwares/auth");

router.use(authentication);
router.get("/", Controller.readTransaction);
router.post("/add", Controller.addTransaction);

module.exports = router;
