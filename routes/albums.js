const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const profileController = require('../controllers/profile_controller');
const albumValidationRules = require('../validation/album');
const profileValidationRules = require('../validation/profile');

/* Get all albums */
router.get('/', albumController.index);

/* Get a specific album */
router.get('/:albumId', albumController.show);

/* Store a new album */
router.post('/', profileValidationRules.addAlbumRules, profileController.addAlbum);

/* Update a specific album */
router.put('/:albumId', albumValidationRules.updateRules, albumController.update);

/* Store a photo to album */
router.post('/:albumId/photos', albumValidationRules.addPhotoRules, albumController.addPhoto);

/* Destroy a specific album */
router.delete('/:albumId', albumController.destroy);

module.exports = router;
