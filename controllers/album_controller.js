/**
 * Album Controller
 */

const debug = require('debug')('photos:album_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Get authenticated user's albums
 *
 * GET /albums
 */
const getAlbums = async (req, res) => {
	await req.user.load('albums')

    res.status(200).send({
        status: 'success',
        data: req.user.related('albums'),       
    });
}

/**
 * Get a specific users album
 *
 * GET /:albumId
 */
const getUserAlbum = async (req, res) => {
	const albumId = req.params.albumId;
	
	const album = await new models.Album({ id: albumId }).fetch({ require: false });

	if(!album){
		return res.status(404).send({
			status: 'fail',
			data: 'Album Not Found'
		});
	};

	try {
		const getAlbum = await new models.Album({ id: albumId }).fetch({ withRerated: ['photos']});

		debug('album with photos: %o', getAlbum);

		res.send({
			status: 'success',
			data: {
				album: getAlbum,
				}			
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Cannot get users album.',
		});
	};

	// return res.send({
	// 	status: 'success',
	// 	data: {
	// 		albums: getAlbums,
	// 	}
	// });
}

/**
 * Store a new album
 *
 * POST /
 */
const addAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};

	// get only the validated data from the request
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');

	try {
		const album = await new models.Album(validData).save();
		debug("Created new album successfully: %o", album);

		res.send({
			status: 'success',
			data: album			
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
	};
	
};

/**
 * Update a specific album
 *
 * PUT /:albumId
 */
const updateAlbum = async (req, res) => {
	const albumId = req.params.albumId;

	// make sure album exists
	const album = await new models.Album({ id: albumId }).fetch({ require: false });
	if (!album) {
		debug("Album to update was not found. %o", { id: albumId });
		return res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
		});
	};

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedAlbum = await album.save(validData);
		debug("Updated album successfully: %o", updatedAlbum);

		res.send({
			status: 'success',
			data: album
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new album.',
		});
	};
};

/**
 * Store a new photo to users album
 *
 * POST /
 */
 const addPhotoToAlbum = async (req, res) => {	
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	const user = await new models.User({ id:req.user.id }).fetch({ withRerated: ['albums'] });

	const album = await new models.Album({ id: req.params.albumId}).fetch({ withRerated: ['photos'] });

	const userAlbum = user.related('albums').find(album => album.id == req.params.albumId);
	debug('Users Album', userAlbum);

	const userPhoto = user.related('photos').find(photos => photos.id == req.user.photo_id);
	debug('Users Photo', userPhoto);

	// Check if the photo is already in the album
	const existingPhooto = album.related('photos').find(photo => photo.id == validData.photo_id);
	if(existingPhooto) {
		res.status(404).send({
			status: 'fail',
			data: 'Photo already exists '
		})
	}


	if (!userAlbum) {
		return res.send({
			status: 'error',
			message: 'Album does not belong to user'
		})
	}
	if (!userPhoto) {
		return res.send({
			status: 'error',
			message: 'Photo does not belong to user'
		})
	}

	try {
		const result = await userAlbum.photos().attach(validData.photo_id);
		// ⚠️ Error 500
		// ⚠️ Cannot read properties of undefined (reading 'photos')
		// cheked -- models.Album har photos(). 
		// Det verkar inte läser in models.Album.
		//  models.Album => [Function ()]
		
		debug("Added photo to album successfully: %O", result);

		res.status(200).send({
			status: 'success',
			data: null,
			
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a album.',
		});
	}
}


module.exports = {
	getAlbums,
	getUserAlbum,
	addAlbum,
	updateAlbum,
	addPhotoToAlbum,
}
