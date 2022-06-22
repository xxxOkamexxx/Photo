/**
 * Album Validation Rules
 */

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
	 body('user_id').exists().isInt({ min: 1 }).bail().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		// check if Album have a user_id
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	 })	
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
	 body('user_id').optional().isInt({ min: 1 }).bail().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		
		// check if Album have a user_id
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	 })		
	 /**
	  * title string required must be at least 3 chars long
	  */
 ];
 
 /**
  * Add photo to album rules
  *
  * Required: photo_id
  * Optional: -
  */
  const addPhotoToAlbumRules = [
	 body('photo_id').exists().isInt({ min: 1 }),		
 ];
 
 
 
 module.exports = {
	 createRules,
	 updateRules,
	 addPhotoToAlbumRules,
 }