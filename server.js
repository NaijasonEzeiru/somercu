const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/user');
const adminRouter = require('./routes/api/admin');

// app.use(cors(corsOptions));
app.use(
	cors({
		origin: [
			'https://kesa-bank-sigma.vercel.app',
			'http://127.0.0.1:5500',
			'https://sommercu-naijasonezeiru.vercel.app',
			'https://www.kesaonline.net',
			'https://www.somersetcu.com',

			'http://localhost:3000'
		],
		credentials: true
	})
);
// app.use(cors({origin:["http://127.0.0.1:5500"], credentials: true}))
// app.use(cors({origin:["http://kesaonline.net"], credentials: true}))
// app.use(cors({origin:["http://localhost:3001"], credentials: true}))

const corsConfig = {
	origin: true,
	credentials: true
};

app.options(
	[
		'https://kesa-bank-sigma.vercel.app',
		'https://sommercu-naijasonezeiru.vercel.app',
		'https://www.kesaonline.net',
		'https://www.somersetcu.com',
		'http://localhost:3000'
	],
	cors(corsConfig)
);
// app.options("http://kesa.online", cors(corsConfig))
// app.options("http://127.0.0.1:5500", cors(corsConfig))
// app.options("http://localhost:3001/", cors(corsConfig))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
	res.send('<h1>Kesa Bank Backend</h1>');
});
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.listen(PORT, () => console.log('server running on port: ' + PORT));

module.exports = app;
