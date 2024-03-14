const express = require('express');
const {userAuth} = require('../middlewares/authorization');
const { addTransaction, getAllTransaction, updateTransaction,deleteTransaction } = require('../controllers/transactionController');
require("dotenv").config();

const router = express.Router();

router.post('/add-transaction',userAuth,addTransaction);
router.post('/get_All_Transactions',userAuth,getAllTransaction);
router.post('/update-transaction',userAuth,updateTransaction);
router.post('/delete-transaction',userAuth,deleteTransaction);

module.exports = router