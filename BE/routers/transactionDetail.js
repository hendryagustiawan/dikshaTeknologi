const router = require("express").Router();
const Controller = require("../controllers/controllerTransactionDetail");
const { authentication } = require("../middelwares/auth");

router.use(authentication);
router.get("/", Controller.readTransactionDetail);
router.post("/add/:id", Controller.addTransactionDetail);

module.exports = router;
