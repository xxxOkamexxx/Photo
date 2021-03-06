/**
 * User model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('User', {
	tableName: 'users',
	photos(){
		return this.hasMany('Photo'); // user (1) : photos (n)
	},
	albums(){
		return this.hasMany('Album'); // user (1) : albums (n)
	},
});
};