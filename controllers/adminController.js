const PrismaClient = require('@prisma/client').PrismaClient;
const CryptoJS = require('crypto-js');
// const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				account_no: +req.params.account_no
			}
		});
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({ err, message: 'User not found' });
	}
};

exports.getAllTransactions = async (req, res) => {
	try {
		const user = await prisma.transaction.findMany();
		res.status(201).json(user);
	} catch (err) {
		res.status(500).json({ err, message: 'User not found' });
	}
};

exports.updateUser = async (req, res) => {
	if (req.body.password) {
		req.body.password = CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASSWORD_SECRET
		).toString();
	}
	const { ...all } = req.body;
	console.log(all);
	try {
		const updatedUser = await prisma.user.update({
			where: {
				account_no: +req.params.account_no
			},
			data: all
		});
		res.status(201).json(updatedUser);
	} catch (err) {
		res.status(500).json({ err, message: 'Operation failed' });
	}
};

exports.crAccBal = async (req, res) => {
	let { account_no, amount, currency, fullName } = req.body;
	if (!isNaN(account_no)) {
		account_no = +account_no - 1002784563;
	}
	try {
		const updatedUser = await prisma.user.update({
			where: {
				// OR: [{ account_no: account_no }, { email: account_no }]
				account_no
			},
			data: {
				account_bal: {
					increment: +amount
				},
				currency: currency,
				transactions: {
					create: [
						{
							amount: +amount,
							// charge,
							type: 'Withdrawal',
							// condition,
							cr_or_dr: 'CR',
							currency,
							// from,
							to: fullName
						}
					]
				}
			}
		});
		console.log(updatedUser);
		res.status(201).json(updatedUser);
	} catch (e) {
		res.status(500).json({ e, message: 'Operation failed' });
		console.log(e);
	}
};

exports.dbAccBal = async (req, res) => {
	let { account_no, amount, currency, fullName } = req.body;
	if (!isNaN(account_no)) {
		account_no = +account_no - 1002784563;
	}
	try {
		const updatedUser = await prisma.user.update({
			where: {
				// OR: [{ account_no: account_no }, { email: account_no }]
				account_no
			},
			data: {
				account_bal: {
					decrement: +amount
				},
				currency: currency,
				transactions: {
					create: [
						{
							amount: +amount,
							// charge,
							// type,
							// condition,
							cr_or_dr: 'DR',
							currency,
							// from,
							to: fullName
						}
					]
				}
			}
		});
		console.log(updatedUser);
		res.status(201).json(updatedUser);
	} catch (e) {
		res.status(500).json({ e, message: 'Operation failed' });
		console.log(e);
	}
};

// exports.updateVerify = async (req, res) => {
//   let {account_no } = req.body;
//  account_no = +account_no -1002784563
//   try {
//     const updatedUser = await prisma.user.update({
//       where: {
//         // account_no: +req.params.account_no,
//         account_no:  +account_no,
//       },
//       data: {
//        verified: true,
//        verification: false
//       }
//     });
//     console.log(updatedUser)
//     res.status(201).json(updatedUser);
//   } catch (e) {
//     res.status(500).json({ e, message: "Operation failed" });
//     console.log(e)
//   }
// };

exports.updateVerification = async (req, res) => {
	let { account_no } = req.body;
	console.log(account_no);
	account_no = +account_no - 1002784563;
	try {
		await prisma.user.update({
			where: {
				// account_no: +req.params.account_no,
				account_no: +account_no
			},
			data: {
				verified: true
			}
		});
		res.status(201).json({ message: 'Verified Successfully' });
	} catch (e) {
		res.status(500).json({ e, message: 'Operation failed' });
		console.log(e);
	}
};
