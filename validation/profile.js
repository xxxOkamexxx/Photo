/**
 * Profile Validation Rules
 */

const { body } = require('express-validator');
const models = require('../models');

/**
 * Update Profile validation rules
 *
 * Required: -
 * Optional: password, first_name, lastname
 */
const updateRules = [
	body('password').optional().isLength({ min: 6 }),
	body('first_name').optional().isLength({ min: 3 }),
	body('last_name').optional().isLength({ min: 3 }),
];

/**
 * Add photo to profile validation rules
 *
 * Required: photo_id
 * Optional: -
 */
 const addPhotoRules = [
	body('photo_id').exists().bail().custom(async value => {
		const photo = await new models.Photo({ id: value }).fetch({ require: false });
		if (!photo) {
			return Promise.reject(`Photo with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	}),
];

/**
 * Add album to profile validation rules
 *
 * Required: album_id
 * Optional: -
 */
 const addAlbumRules = [
	body('album_id').exists().bail().custom(async value => {
		const album = await new models.Album({ id: value }).fetch({ require: false });
		if (!album) {
			return Promise.reject(`Album with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	}),
];

module.exports = {
	addPhotoRules,
	addAlbumRules,
	updateRules,
}
