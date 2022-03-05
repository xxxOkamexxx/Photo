/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');


/**
 * Create Photo validation rules
 *
 * Required: title, url, comment
 * Optional: -
 */
const createRules = [
	body('title').exists().isLength({ min: 3 }),
	body('url').exists().isURL(),
	body('comment').isLength({min: 3}),
	body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}
		return Promise.resolve();
	}),
	/**
	 * title string required must be at least 3 chars long
	 * url string required must be a url
	 * comment string must be at least 3 chars long
	 */
];

/**
 * Update Photo validation rules
 *
 * Required: -
 * Optional: title, url, comment
 */
const updateRules = [
	body('title').optional().isLength({ min: 3 }),
	body('url').optional().exists().isURL(),
	body('comment').optional().isLength({min: 3}),
	body('user_id').exists().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}
		return Promise.resolve();
	}),
	/**
	 * title string must be at least 3 chars long
	 * url string must be a url
	 * comment string must be at least 3 chars long
	 */
];

module.exports = {
	createRules,
	updateRules,
}
