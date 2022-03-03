/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos(){
			return this.belongsToMany('Photos')
		},
		albums(){
			return this.belongsToMany('Albums')
		},
	});
};
