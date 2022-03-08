const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const userValidationRules = require('../validation/user');

/* Get all users */
router.get('/', userController.index);

/* Get a specific user */
router.get('/:userId', userController.show);

/* Store a new user */
router.post('/', userValidationRules.createRules, userController.store);

/* Update a specific user */
router.put('/:userId', userValidationRules.updateRules, userController.update);

/* Destroy a specific user */
router.delete('/:userId', userController.destroy);

module.exports = router;
