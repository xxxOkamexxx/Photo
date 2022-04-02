const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const registerController = require('../controllers/register_controller');
const userValidationRules = require('../validation/user');

/* GET / */
router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'oh, hi' }});
}); // test

router.use('/photos', auth.basic, require('./photos'));
router.use('/albums', auth.basic,require('./albums'));
router.use('/profile', auth.basic, require('./profile'));
//router.use('/users', require('./users'));

//register a new user
router.post('/register', userValidationRules.createRules, registerController.register);

module.exports = router;
