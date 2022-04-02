const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photo_controller');
const profileController = require('../controllers/profile_controller');
const photoValidationRules = require('../validation/photo');

/* Get all photos */
router.get('/', profileController.getPhoto);

/* Get a specific photo */
router.get('/:photoId', photoController.show);

/* Store a new photo */
router.post('/', photoValidationRules.createRules, photoController.store);

/* Update a specific photo */
router.put('/:photoId', photoValidationRules.updateRules, photoController.update);

/* Destroy a specific photo */
router.delete('/:photoId', photoController.destroy);

module.exports = router;
