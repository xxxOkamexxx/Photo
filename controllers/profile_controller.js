/**
 * Profile Controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('photos:profile_controller');
const { matchedData, validationResult } = require('express-validator');


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
    // get user and also eager-load the photos-relation
    //const user = await new models.User({ id: req.user.id }) 
    //.fetch({ withRelated: ['photos'] });

    // "lasy load" the photos-reration
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
    // get user and also eager-load the photos-relation
    //const user = await new models.User({ id: req.user.id }) 
    //.fetch({ withRelated: ['photos'] });

    // "lasy load" the photos-reration
    await req.user.load('albums');

    res.status(200).send({
        status: 'success',
        data:{
            photos: req.user.related('albums'),
        },
    });
}; 

/**
 *  Add a photo to the authenticated user
 * @todo  1. Validate that the photo actually exists
 * @todo  2. Validate that the photo they are trying to add isn't already in the list
 */
 const addPhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load book relationship
	await req.user.load('books');

	// get the user's books
	const books = req.user.related('books');

	// check if book is already in the user's list of books
	const existing_book = books.find(book => book.id == validData.book_id);

	// if it already exists, bail
	if (existing_book) {
		return res.send({
			status: 'fail',
			data: 'Book already exists.',
		});
	}

	try {
		const result = await req.user.books().attach(validData.book_id);
		debug("Added book to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a book to a user.',
		});
		throw error;
	}
}

/**
 *  Add an alubum to the authenticated user
 * @todo  1. Validate that the album actually exists
 * @todo  2. Validate that the album they are trying to add isn't already in the list
 */
 const addAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load book relationship
	await req.user.load('books');

	// get the user's books
	const books = req.user.related('books');

	// check if book is already in the user's list of books
	const existing_book = books.find(book => book.id == validData.book_id);

	// if it already exists, bail
	if (existing_book) {
		return res.send({
			status: 'fail',
			data: 'Book already exists.',
		});
	}

	try {
		const result = await req.user.books().attach(validData.book_id);
		debug("Added book to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a book to a user.',
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