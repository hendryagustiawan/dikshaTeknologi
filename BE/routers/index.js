const router = require("express").Router();
const routerTransaction = require("./transaction");
const routerUser = require("./user");
const routerTransactionDetail = require("./transactionDetail");
const routerProduct = require("./product");
const routerProductCategory = require("./productCategory");
const routerProductVariant = require("./productVariant");
const routerCustomer = require("./customer");

router.use("/transaction", routerTransaction);
router.use("/customer", routerCustomer);
router.use("/transaction-detail", routerTransactionDetail);
router.use("/product", routerProduct);
router.use("/user", routerUser);
router.use("/product-category", routerProductCategory);
router.use("/product-variant", routerProductVariant);

module.exports = router;
