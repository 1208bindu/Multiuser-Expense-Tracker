const Transaction = require("../models/transactionModel");

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransaction = async (req, res, next) => {
  try {
    const { userId, pNum } = req.body;
    console.log(req.body);
    const pNumber = typeof pNum !== "undefined" ? pNum : 1;

    const pSize = 5;
    const startPoint = 0;
    const endPoint = pNumber * pSize;
    console.log(pNumber, startPoint, endPoint);

    const transaction = await Transaction.find().sort({ createdAt: -1 });

    const transactions = await transaction.filter((t) => userId === t.userId);

    const transDisplay = await transactions.slice(startPoint, endPoint);

    return res.status(200).json({
      success: true,
      count: transactions.length,
      fulldata: transactions,
      data: transDisplay,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, userId, category } = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
