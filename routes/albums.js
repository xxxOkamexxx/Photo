const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');


/* Get all albums */
router.get('/', albumController.getAlbums);

/* Get a specific album */
router.get('/:albumId', albumController.getUserAlbum);

/* Store a new album */
router.post('/', albumValidationRules.createRules, albumController.addAlbum);

/* Update a specific album */
router.put('/:albumId', albumValidationRules.updateRules, albumController.updateAlbum);

/* Store a photo to album */
router.post('/:albumId/photos', albumValidationRules.addPhotoToAlbumRules, albumController.addPhotoToAlbum);


module.exports = router;
