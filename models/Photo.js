/**
 * Photo model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		album() {
			return this.belongsToMany('Album');
		},
		users() {
			return this.belongsTo('User');
		}
	});
};
