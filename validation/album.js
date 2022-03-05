/**
 * Album Validation Rules
 */

const { promise } = require('bcrypt/promises');
const { body } = require('express-validator');
const models = require('../models');

/**
 * Create Album validation rules
 *
 * Required: title
 * Optional: -
 */
const createRules = [
	body('title').exists().isLength({ min: 4 }),
	body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}
		return Promise.resolve();
	}),	
	/**
	 * title string required must be at least 3 chars long
	 */
];

/**
 * Update Album validation rules
 *
 * Required: -
 * Optional: title
 */
const updateRules = [
	body('title').optional().isLength({ min: 4 }),
	body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}
		return Promise.resolve();
	}),	
	/**
	 * title string required must be at least 3 chars long
	 */
];

module.exports = {
	createRules,
	updateRules,
}
