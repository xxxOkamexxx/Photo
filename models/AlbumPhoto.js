/**
 * AlbumPhoto model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('AlbumPhoto', {
		tableName: 'album_photo',
		albums() {
			return this.hasMany('Album'); // albums (n) : photos (n)
		},
		photos() {
			return this.hasMany('Photo'); //albums (n) : user (1)
		},

	});
};