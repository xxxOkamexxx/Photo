/**
 * Album model
 */

 module.exports = (bookshelf) => {
	return bookshelf.model('Album', {
		tableName: 'albums',
		photos() {
			return this.belongsToMany('Photo'); // albums (n) : photos (n)
		},
		users() {
			return this.belongsTo('User'); //albums (n) : user (1)
		},

	});
};