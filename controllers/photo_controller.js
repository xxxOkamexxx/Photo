/**
 * Photo Controller
 */

 const debug = require('debug')('photos:photo_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 
 /**
  * Get authenticated user's photos
  *
  * GET /
  */
 const getPhotos = async (req, res) => {
	 
	await req.user.load('photos');

    res.status(200).send({
        status: 'success',
        data:{
            photos: req.user.related('photos'),
        },
    });
 }
 
 /**
  * Get a specific photo
  *
  * GET /:photoId
  */
  const getUserPhoto = async (req, res) => {

	const user = await new models.User({ id: req.user.id }).fetch({ withRelated: ['photos'] });

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};

	const validData = matchedData(req);

	const photo = await user.related('photos').find(photo => photo.id == req.params.photoId);
	
	try {
		const getPhoto = await photo.get(validData);
		debug("Updated photo successfully: %o", getPhoto);

		res.send({
			status: 'success',
			data: photo
		});

	} catch (error) {
		res.status(404).send({
			status: 'error',
			message: 'Photo Not Found.',
		});
	};
}
 
 /**
  * Store a new photo
  *
  * POST /
  */
 const addPhoto = async (req, res) => {
	 // check for any validation errors
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 }
 
	 // get only the validated data from the request
	 const validData = matchedData(req);
	 validData.user_id = req.user.get('id');
 
	 try {
		 const photo = await new models.Photo(validData).save();
		 debug("Created new photo successfully: %O", photo);
 
		 res.send({
			 status: 'success',
			 data: photo,			 
		 });
 
	 } catch (error) {
		 res.status(500).send({
			 status: 'error',
			 message: 'Exception thrown in database when creating a new photo.',
		 });
	 };
 };
 
 /**
  * Update a specific photo
  *
  * PUT /:photoId
  */
 const updatePhoto = async (req, res) => {
	 const photoId = req.params.photoId;
 
	 // make sure photo exists
	 const photo = await new models.Photo({ id: photoId }).fetch({ require: false });
	 if (!photo) {
		 debug("Photo to update was not found. %o", { id: photoId });
		 res.status(404).send({
			 status: 'fail',
			 data: 'Photo Not Found',
		 });
		 return;
	 }
 
	 // check for any validation errors
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
		 return res.status(422).send({ status: 'fail', data: errors.array() });
	 }
 
	 // get only the validated data from the request
	 const validData = matchedData(req);
 
	 try {
		 const updatedPhoto = await photo.save(validData);
		 debug("Updated photo successfully: %O", updatedPhoto);
 
		 res.send({
			 status: 'success',
			 data: photo,
		 });
 
	 } catch (error) {
		 res.status(500).send({
			 status: 'error',
			 message: 'Exception thrown in database when updating a new photo.',
		 });
	 }
 }
 
 
 module.exports = {
	 getPhotos,
	 getUserPhoto,
	 addPhoto,
	 updatePhoto,
 }