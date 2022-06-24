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
	/* const user = await models.User.fetchById(req.User.use_id, { withRerated: ['albums'] }); */
	try{
		res.status(200).send({
			status: 'success',
			data: req.user.related('albums'),       
		});
	} catch (error) {
        res.status(500).send({
            status: 'fail',
            message: "Exception thrown in database when getting a new album."
        });
        throw error;
    }
};

/**
 * Get a specific users album
 *
 * GET /:albumId
 */
const getUserAlbum = async (req, res) => {
	await req.user.load('albums');

    const oneAlbum = await new models.Album({ id: req.params.albumId });

    const albumRelation = req.user.related('albums');

    const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

    if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail',
            data: 'An album with that id could not be found'
        });
    };

	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRerated: ['photos'] })

	try {
        res.status(200).send({
            status: 'success',
            data: album
        })
    } catch(error) {
        res.status(500).send({
            status: 'fail',
            message: error
        });
        throw error;
    }

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
	/* const user = await models.User.fetchById(req.User.use_id, { withRerated: ['albums'] }); */
	
	// check for any validation errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	};

	// get only the validated data from the request
	const validData = matchedData(req);
	validData.user_id = req.user.id;

	try {
		const album = await new models.Album(validData).save();
		debug("Created new album successfully: %o", album);

		res.status(200).send({
            status: 'success',
            data: album		
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	};
	
};

/**
 * Update a specific album
 *
 * PUT /:albumId
 */
const updateAlbum = async (req, res) => {
	await req.user.load('albums');
	/* const user = await models.User.fetchById(req.User.use_id, { withRerated: ['albums'] }); */

	// make sure album exists
	const oneAlbum = await new models.Album({ id: req.params.albumId });

	const albumRelation = req.user.related('albums');
	
	const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

	if(!foundAlbum) {
        return res.status(404).send({
            status: 'fail   ',
            data: 'An album with that id could not be found'
        });
    }

	// check for any validation errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).send({ 
			status: 'fail', 
			data: errors.array() 
		});
	};

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedAlbum = await foundAlbum.save(validData);
		debug("Updated album successfully: %o", updatedAlbum);

		res.send({
			status: 'success',
			data: updatedAlbum,
		});

	}  catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating the album.'
        });
        throw error;
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
	validData.album_id = req.params.albumId;

	/* -- album -- */
	await req.user.load('albums');

	const oneAlbum = await new models.Album({ id: req.params.albumId });

	const albumRelation = req.user.related('albums');

	const foundAlbum = albumRelation.find(album => album.id == oneAlbum.id);

	if(!foundAlbum) {
		res.status(404).send({
			status: 'fail',
			data: 'An album with that id could not be found',
		});
	}

	/* -- photo -- */
	await req.user.load('photos');

	const onePhoto = await new models.Photo({ id: validData.photo_id });

	const photoRelation = req.user.related('photos');

	const foundPhoto = photoRelation.find(photo => photo.id == onePhoto.id);
	
	if(foundPhoto) {
		return res.status(404).send({
            status: 'fail',
            data: 'A photo with that id could not be found'
        });
	}

	const album = await new models.Album({ id: req.params.albumId}).fetch({ withRerated: ['photos'] });

	const photos = album.related('photos');

	const existingPhoto = photos.find(photo => photo.id == validData.photo_id);

	if (existingPhoto) {
        return res.status(422).send({
            status: 'fail',
            data: 'Photo exists already'
        })
    }

	try {
		await new models.AlbumPhoto(validData).save();

		res.status(200).send({
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
	getAlbums,
	getUserAlbum,
	addAlbum,
	updateAlbum,
	addPhotoToAlbum,
}
