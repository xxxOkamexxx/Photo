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
	body('title').exists().isLength({ min: 4 }),
     body('url').exists().isURL(),
     body('comment').optional().isLength({ min: 3 })
	
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
	body('title').optional().isLength({ min: 4 }),
	body('url').optional().isURL(),
	body('comment').optional().isLength({ min: 3 })
	
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