const express = require('express');
const authController = require('../Controllers/authController.js');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/', authController.register, (req, res) => {
	const payload = {
		user: {
			id: req.body.username,
		},
	};
	jwt.sign(
		payload,
		'secrettoken',
		{ expiresIn: 360000 },
		(err, token) => {
			if (err) throw err;
			return res.status(200).json({ token });
		}
	);
});

module.exports = router;
