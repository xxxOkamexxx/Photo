const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const profileController = require('../controllers/profile_controller');
const albumValidationRules = require('../validation/album');

/* Get all albums */
router.get('/', profileController.getAlbum);

/* Get a specific album */
router.get('/:albumId', albumController.show);

/* Store a new album */
router.post('/', albumValidationRules.createRules, albumController.store);

/* Update a specific album */
router.put('/:albumId', albumValidationRules.updateRules, albumController.update);

/* Store a photo to album */
router.post('/:albumId/photos', albumValidationRules.addPhotoRules, albumController.addPhoto);

/* Destroy a specific album */
router.delete('/:albumId', albumController.destroy);

module.exports = router;
