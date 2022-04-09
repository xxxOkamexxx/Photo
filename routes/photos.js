const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const profileController = require('../controllers/profile_controller');
const photoValidationRules = require('../validation/photo');
const profileValidationRules = require('../validation/profile');

/* Get all photos */
router.get('/', photoController.index);

/* Get a specific photo */
router.get('/:photoId', photoController.show);

/* Store a new photo */
router.post('/', profileValidationRules.addPhotoRules, profileController.addPhoto);

/* Update a specific photo */
router.put('/:photoId', photoValidationRules.updateRules, photoController.update);

/* Destroy a specific photo */
router.delete('/:photoId', photoController.destroy);

module.exports = router;
