/**
 * User Controller / Profile Controller
 */


/**
 * Get a specific user
 *
 * GET /:userId
 */
const getUser = async (req, res) => {
	const user = await new models.User({ id: req.params.userId })
		.fetch({ withRelated:['albums','photos']});

	res.send({
		status: 'success',
		data: user,
	});
}



module.exports = {
	getUser,
}
