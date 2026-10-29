const express = require('express');
const router = express.Router();
const washermanController = require('../controllers/washerman.controller');
const { isAuth, isWasherman } = require('../middleware/isAuth');

// Public/Customer/Admin routes
router.get('/', washermanController.getAllWashermen);

router.get('/:id', washermanController.getWashermanById);

// Protected Washerman-only routes
router.put('/range', isAuth, isWasherman, washermanController.updateRange);
router.put('/location', isAuth, isWasherman, washermanController.updateLocation);
router.get('/search',isAuth,isWasherman, washermanController.findWashermenWithinRange);
module.exports = router;

