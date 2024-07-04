const express = require("express");
const checkLimitMiddleware = require("../middleware/check-limit");
const checkPenaltiMiddleware = require("../middleware/check-penalti");
const borrowController = require("../controllers/borrow.controller");
const returnController = require("../controllers/return.controller");

const router = express.Router();

router.post(
  "/",
  checkPenaltiMiddleware.checkPenalti,
  checkLimitMiddleware.checkLimit,
  borrowController.addBorrow
);
router.patch("/:id", returnController.updateBorrow);

module.exports = router;
