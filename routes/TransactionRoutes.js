const express = require("express");
const router = express.Router();
const {
  getTransaction,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

router.route("/").post(addTransaction);
router.route("/getDetails").post(getTransaction);

router.route("/:id").delete(deleteTransaction);

module.exports = router;
