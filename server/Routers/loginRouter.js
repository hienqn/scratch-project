const express = require('express');
const authController = require('../Controllers/authController.js');
const passport = require('passport');
const jwt = require('jsonwebtoken')

const router = express.Router();
// when get a post request fine and compare user
// router.post('/', passport.authenticate('local'), (req, res) => {

// 	// const payload = {
//   //   user: {
//   //     id: req.body.username + req.body.password,
//   //   },
// 	// };
	
// 	// jwt.sign(
// 	// 	payload,
// 	// 	'asecret',
// 	// 	{ expiresIn: 360000 },
// 	// 	(err, token) => {
// 	// 		if (err) throw err;
// 	// 		return res.status(200).json({ token });
// 	// 	}
// 	// );

// 	return res.status(200).json('Successful');
// });


router.post("/", passport.authenticate("local"), (req, res) => {
  const payload = {
    user: {
      id: req.body.username,
    },
	};
	
	jwt.sign(payload, 'secrettoken', { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    return res.status(200).json({ token });
  });

  // return res.status(200).json('Successful');
});
module.exports = router;
