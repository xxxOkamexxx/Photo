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
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
		throw error;
	}

	try {
		const user = await new models.User(validData).save();
		debug("Create new user successfuly: %O", user);

		res.send({
			status: 'success',
			data: {
				email: validData.email,
                first_name: validData.first_name,
                last_name: validData.last_name
			},
		});
	} catch (error) {
		res.status(500).send({
			status:'error',
			message:'Exception thrown in database when creating a new user.'
		});
		throw error;
	}
}

module.exports = {
	register,
}