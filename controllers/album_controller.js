/**
 * Album Controller
 */

const debug = require('debug')('photos:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get all albums
 *
 * GET /
 */
const index = async (req, res) => {
	const all_albums = await models.Album.fetchAll();

	res.send({
		status: 'success',
		data: {
			albums: all_albums
		},
	});
}

/**
 * Get a specific album
 *
 * GET /:albumId
 */
const show = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos','users']});

	res.send({
		status: 'success',
		data: {
			album,
		}
	});
}

/**
 * Store a new album
 *
 * POST /
 */
const store = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const album = await new models.Album(validData).save();
		debug("Created new example successfully: %O", album);

		res.send({
			status: 'success',
			data: {
				album,
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
	
}

/**
 * Update a specific album
 *
 * PUT /:albumId
 */
const update = async (req, res) => {
	const albumId = req.params.albumId;

	// make sure album exists
	const album = await new models.Album({ id: albumId }).fetch({ require: false });
	if (!album) {
		debug("Album to update was not found. %o", { id: albumId });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
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
		const updatedAlbum = await album.save(validData);
		debug("Updated album successfully: %O", updatedAlbum);

		res.send({
			status: 'success',
			data: album,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new album.',
		});
		throw error;
	}
}



/**
 * Destroy a specific album
 *
 * DELETE /:albumId
 */
const destroy = (req, res) => {
	res.status(400).send({
		status: 'fail',
		message: 'You need to write the code for deleting this resource yourself.',
	});
}

/**
 * Store a new photo to album
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
	// lazy-load photo relationship
	await req.album.load('photos'); // <--- ⚠️ Det här går något fel.

	// get the album's photos
	const photos = req.album.related('photos');

	// check if photo is already in the album's list of photos
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	// if it already exists, bail
	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists.',
		});
	}

	try {
		const result = await req.album.photos().attach(validData.photo_id);
		debug("Added photo to album successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
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
	index,
	show,
	store,
	update,
	destroy,
	addPhoto,
}
