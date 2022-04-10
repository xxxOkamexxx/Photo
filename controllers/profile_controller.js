/**
 * Profile Controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('photos:profile_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');



/**
 * Get authenticated user's profile
 *
 * GET /
 */
const getProfile = async (req, res) => {
    res.send({
        status: 'success',
        data: {
            user: req.user, 
        }
    });
}




/**
 *  Add a photo to the authenticated user 
 * 
 * POST /photos ⚠️
 */
 const addPhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// fetch user and eager-load photos relation
	const user = await User.fetchById(req.user.user_id, { withRelated: ['photos'] });

	// get the user's photos
	const photos = user.related('photos');

	// check if photo is already in the user's list of photos
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	// if it already exists, bail
	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists.',
		});
	}

	try {
		const result = await user.photos().attach(validData.photo_id); 
		// ⚠️ Error 500: not function  (Crashed)
		// add user_id rules in photo's validation rules => change 'sync' to 'attach' => send Error 422.
		debug("Added photo to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a user.',
		});
		throw error;
	}
}

/**
 *  Add an album to the authenticated user ⚠️
 * 
 * POST/ albums
 */
 const addAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// fetch user and eager-load books relation
	const user = await User.fetchById(req.user.user_id, { withRelated: ['albums'] });


	// lazy-load album relationship
	//await req.user.load('albums');

	// get the user's albums
	const albums = user.related('albums');

	// check if album is already in the user's list of albums
	const existing_album = albums.find(album => album.id == validData.album_id);

	// if it already exists, bail
	if (existing_album) {
		return res.send({
			status: 'fail',
			data: 'album already exists.',
		});
	}

	try {
		const result = await user.albums().attach(validData.album_id);
		debug("Added album to user successfully: %O", result);

		res.send({
			status: 'success',
			data:null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	}
}

/**
 * Store a new photo into album ⚠️
 *
 */
 const addAlbumsPhoto = async (req, res) => {	
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}
	
	// get only the validated data from the request
	const validData = matchedData(req);

	// fetch photos and album relation
	const album = await newAlbum.fetchById(req.album.album_id,{ withRelated:['photos']});

	// get the album's photos
	const photos = album.related('photos');

	// check if photo is already in the album
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	// if photos already exists,
	if( existing_photo){
		return res.send({
			status:'fail',
			data: 'Photo already exists.'
		});
	}

	try {
		//console.log('error check: ', models.Album);
		const result = await album.photos().attach(validData.photo_id);
		// ⚠️ Error 500
		// ⚠️ Cannot read properties of undefined (reading 'photos')
		// cheked -- models.Album har photos(). 
		// Det verkar inte läser in models.Album.
		//  models.Album => [Function ()]
		
		debug("Added photo to album successfully: %O", result);

		res.send({
			status: 'success',
			data: null
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a album.',
		});
		throw error;
	}
}


module.exports = {
    getProfile,
   // getPhoto,
   // getAlbum,
    addPhoto,
    addAlbum,
	addAlbumsPhoto,
}