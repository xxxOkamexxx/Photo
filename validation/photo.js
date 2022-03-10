/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');


/**
 * Create Photo validation rules POST
 *
 * Required: title, url, comment
 * Optional: -
 */
const createRules = [
	body('title').exists().isLength({ min: 3 }),
	body('url').exists().isURL().custom(async value => {
		const photo = await new models.Photo({ url: value }).fetch({ require: false });
		if (photo) {
			return Promise.reject("URL already exists.")
		}

		return Promise.resolve();
	}),
	body('comment').isLength({min: 3}),
	
	/**
	 * title string required must be at least 3 chars long
	 * url string required must be a url
	 * comment string must be at least 3 chars long
	 */
];

/**
 * Update Photo validation rules PUT
 *
 * Required: -
 * Optional: title, url, comment
 */
const updateRules = [
	body('title').optional().isLength({ min: 3 }),
	body('url').optional().exists().isURL(),
	body('comment').optional().isLength({min: 3}),
	
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