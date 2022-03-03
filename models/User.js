/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
		tableName: 'users',
		photos(){
			return this.hasMany('Photos')
		},
		albums(){
			return this.hasMany('Albums')
		},
	});
};
