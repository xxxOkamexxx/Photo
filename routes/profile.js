const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

/**
 * Get authenticated user's profile
 */
router.get('/', profileController.getProfile);

/**
 * Update authenticated user's profile
 */
router.put('/', profileValidationRules.updateRules, profileController.updateProfile);

/**
 * Get authenticated user's photos
 */
router.get('/photos', profileController.getPhoto);

/**
 * Get authenticated user's albumss
 */
router.get('/albums', profileController.getAlbum);

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

module.exports = router;