const express = require("express");
const router = express.Router();
const {
  getTransaction,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

router.route("/").post(addTransaction);

router.route("/:id").get(getTransaction).delete(deleteTransaction);

module.exports = router;
