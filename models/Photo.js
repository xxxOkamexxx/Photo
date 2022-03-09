/**
 * Photo model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		albums() {
			return this.belongsToMany('Album'); // photos (n) : albums (n)
		},
		users() {
			return this.belongsTo('User'); // photos (n) : user (1)
		}
	});
};
