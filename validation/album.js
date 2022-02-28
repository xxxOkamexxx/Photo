/**
 * Example Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Create Example validation rules
 *
 * Required: title
 * Optional: -
 */
const createRules = [
	body('title').exists().isLength({ min: 4 }),
	/**
	 * title string required must be at least 3 chars long
	 */
];

/**
 * Update Example validation rules
 *
 * Required: -
 * Optional: title
 */
const updateRules = [
	body('title').optional().isLength({ min: 4 }),
	/**
	 * title string required must be at least 3 chars long
	 */
];

module.exports = {
	createRules,
	updateRules,
}
