const {
	verifyToken,
	verifyTokenAndAuth,
	verifyAdmin
} = require('../../controllers/verifyToken');
const {
	updateUser,
	crAccBal,
	dbAccBal,
	updateVerification,
	getAllTransactions,
	getKycs,
	updateTransaction
} = require('../../controllers/adminController');

const router = require('express').Router();

//   router.route("/").get(getAllUsers);

// router.route("/createUser").get(verifyAdmin, createUser);

router.route('updateUser').put(verifyAdmin, updateUser);
router.route('get-kycs').put(getKycs);
router.route('/update-transaction').put(updateTransaction);
router.route('/credit-acc').post(crAccBal);
router.route('/all-transactions').get(getAllTransactions);
router.route('/verify-doc').put(updateVerification);
router.route('/debit-acc').post(dbAccBal);

module.exports = router;
