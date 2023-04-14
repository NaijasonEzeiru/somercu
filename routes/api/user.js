const {
	verifyToken,
	verifyTokenAndAuth
} = require('../../controllers/verifyToken');
const {
	updateUser,
	getUser,
	getAllUsers,
	updateAdmin,
	verify
} = require('../../controllers/usersController');

const router = require('express').Router();

router.route('/update-admin/:account_no').put(updateAdmin);
router.route('/verify').post(verify);

router.route('/').get(getAllUsers);

// router.route("/:id").get(verifyTokenAndAuth, getUser).put(verifyTokenAndAuth, updateUser);

module.exports = router;
