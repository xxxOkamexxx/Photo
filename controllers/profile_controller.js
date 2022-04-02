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
 * Update authenticated user's profile
 *
 * PUT /
 */
const updateProfile = async (req, res) => {    
    // check for any validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only the validated data from the request
    const validData = matchedData(req);

    // update the user's password, but only if they sent us a new password
    if (validData.password) {
        try {
            validData.password = await bcrypt.hash(validData.password,10);

        } catch (error) {
            res.status(500).send({
                status: 'error',
                message:'Exception thrown when hashing the password.'
            });
            throw error;
        }
    }

    try {
        const updatedUser = await user.save(validData);
        debug("Updated user successfully: %O", updatedUser);

        res.send({
            status: 'success',
            data: {
                user:updatedUser,
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when updating a new user.',
        });
        throw error;
    }
}

/**
 *  Get authenticated user's photos
 */
const getPhoto = async (req, res) => {

    await req.user.load('photos');

    res.status(200).send({
        status: 'success',
        data:{
            photos: req.user.related('photos'),
        },
    });
}; 

/**
 *  Get authenticated user's albums
 */
 const getAlbum = async (req, res) => {
 
    await req.user.load('albums','photos');

    res.status(200).send({
        status: 'success',
        data:{
            albums: req.user.related('albums'),
            photos: req.user.related('photos')
        },
    });
}; 

/**
 *  Add a photo to the authenticated user
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
	await req.user.load('photos');

	// get the user's photos
	const photos = req.user.related('photos');

	// check if photo is already in the user's list of photos
	const existing_photo = photos.find(photos => photo.id == validData.photo_id);

	// if it already exists, bail
	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists.',
		});
	}

	try {
		const result = await req.user.photos().attach(validData.photo_id);
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
 *  Add an album to the authenticated user
 */
 const addAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load album relationship
	await req.user.load('albums');

	// get the user's albums
	const user = req.user.related('albums');

	// check if album is already in the user's list of albums
	const existing_user = albums.find(album => album.id == validData.user_id);

	// if it already exists, bail
	if (existing_user) {
		return res.send({
			status: 'fail',
			data: 'album already exists.',
		});
	}

	try {
		const result = await req.user.albums().attach(validData.user_id);
		debug("Added album to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	}
}


module.exports = {
    getProfile,
    updateProfile,
    getPhoto,
    getAlbum,
    addPhoto,
    addAlbum,
}