const router = require("express").Router();
const ControllerCustomers = require("../controllers/controllerCustomers");

router.post("/register", ControllerCustomers.register);
router.post("/login", ControllerCustomers.login);

module.exports = router;
