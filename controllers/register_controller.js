/**
 * Register Controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('photos:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');

/**
 * Register a new user
 *
 * POST /
 */
const register = async (req, res) => {
	// check for any validation errors	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);
	
	debug("The validated data: ",validData);


	// generate a hash of `validData.password`
	// and overwrite `validData.password` with the generated hash

	try {
		validData.password = await bcrypt.hash(validData.password, 10);
		//console.log(validData.password); // check genelated "hash"
		debug("Created new hash successfully: %O"); 

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
	}

	try {
		const user = await new models.User(validData).save();
		debug("Create new user successfuly: %O", user);

		res.send({
			status: 'success',
			data: user
		});
	} catch (error) {
		res.status(500).send({
			status:'error',
			message:'Exception thrown in database when creating a new user.'
		});
	}
}

module.exports = {
	register,
}