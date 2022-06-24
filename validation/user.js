/**
 * User Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create User validation rules
 *
 * Required: title
 * Optional: -
 */
const createRules = [
	body('email').exists().isEmail().custom(async value => {
		const user = await new models.User({ email: value }).fetch({ require: false });
		if (user) {
			return Promise.reject("Email already exists.")
		}

		return Promise.resolve();
	}),
	body('password').exists().trim().isLength({ min: 6 }),
	body('first_name').exists().trim().isLength({ min: 3 }),
	body('last_name').exists().trim().isLength({ min: 3 }),
	/**
	 *  email string required must be a valid email and not already exist
	 * password string required must be at least 6 chars long
	 * first_name string required must be at least 3 chars long
	 * last_name string required must be at least 3 chars long
	 * password must not be included in response 
	 */
];

/**
 * Update Example validation rules
 *
 * Required: -
 * Optional: title
 */
const updateRules = [
	/* body('user_id').exists().trim().isInt(),
	body('email').exists().isEmail().trim().isString().custom(async value => {
		const email = await new models.User({ email: value }).fetch({ require: false });
		if (email) {
			return Promise.reject("Email already exists.")
		}

		return Promise.resolve();
	}), */
	body('password').exists().trim().isLength({ min: 6 }),
	body('first_name').exists().trim().isLength({ min: 3 }),
	body('last_name').exists().trim().isLength({ min: 3 }),
	/**
	 * email string required must be a valid email and exist
	 * password string required must be at least 6 chars long
	 */
];

module.exports = {
	createRules,
	updateRules,
}
