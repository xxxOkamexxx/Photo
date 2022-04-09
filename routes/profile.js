const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

/**
 * Get authenticated user's profile
 */
router.get('/', profileController.getProfile);





/**
 * Add a photos to the authenticated user
 *
 */
router.post('/photos', profileValidationRules.addPhotoRules, profileController.addPhoto);

/**
 * Add a albums to the authenticated user
 *
 */
 router.post('/albums', profileValidationRules.addAlbumRules, profileController.addAlbum);

 /**
 * Add a photos into album to the authenticated user
 *
 */
  router.post('/albums/:albumId/photos', profileValidationRules.addPhotoRules, profileController.addAlbumsPhoto);

module.exports = router;