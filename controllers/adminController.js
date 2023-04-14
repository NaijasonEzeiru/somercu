const PrismaClient = require("@prisma/client").PrismaClient;
const CryptoJS = require("crypto-js");
// const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError } = require("@prisma/client/runtime/library");


const prisma = new PrismaClient();

exports.getUser = async ( req, res) => {
   try {
    const user = await prisma.user.findUnique({
      where: {
        account_no: +req.params.account_no,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "User not found" });
  }
};

exports.getAllUsers = async ( req, res) => {
   try {
    const user = await prisma.user.findMany({
      include: {
        verification
      }
    });
  
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err, message: "User not found" });
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
        account_no: +req.params.account_no,
      },
      data: all,
    });
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err, message: "Operation failed" });
  }
};

exports.crAccBal = async (req, res) => {
  let {account_no, amount, currency } = req.body;
  console.log("🚀 ~ file: adminController.js:52 ~ exports.updateBal= ~ account_no, amount:", account_no, amount, currency)
 account_no = +account_no -1002784563
  try {
    const updatedUser = await prisma.user.update({
      where: {
        // account_no: +req.params.account_no,
        account_no:  +account_no,
      },
      data: {
        account_bal: {
            increment: +amount,     
          },
        currency: currency
      }
    });
    console.log(updatedUser)
    res.status(201).json(updatedUser);
  } catch (e) {
    res.status(500).json({ e, message: "Operation failed" });
    console.log(e)
  }
};

 

exports.dbAccBal = async (req, res) => {
  let {account_no, amount, currency, email } = req.body;
  console.log("🚀 ~ file: adminController.js:52 ~ exports.updateBal= ~ account_no, amount:", account_no, amount, currency)
 account_no = +account_no -1002784563
  try {
    const updatedUser = await prisma.user.update({
      where: {
        OR: [
          {account_no : account_no},
          {email: email}
        ]
      },
      data: {
        account_bal: {
            decrement: +amount,     
          },
        currency: currency,
        transaction: {
          create: {
            amount: +amount,
            type: debit
          }
        }
      }
    });
    console.log(updatedUser)
    res.status(201).json(updatedUser);
  } catch (e) {
    res.status(500).json({ e, message: "Operation failed" });
    console.log(e)
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
  let {account_no } = req.body;
  console.log(account_no)
 account_no = +account_no -1002784563
  try {
   await prisma.user.update({
      where: {
        // account_no: +req.params.account_no,
        account_no:  +account_no,
      },
      data: {
       verified: true
      }
    });
    res.status(201).json({message: "Verified Successfully"});
  } catch (e) {
    res.status(500).json({ e, message: "Operation failed" });
    console.log(e)
  }
};
