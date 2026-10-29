const express = require('express');
const { getNearbyWashermen, createSampleWashermen, getAllWashermenLocations, getCustomersNearLaundryman } = require('../controllers/location.controller');
const { isAuth } = require('../middleware/isAuth');
const router = express.Router();    

router.get('/washer/nearby', getNearbyWashermen);
router.post('/washer/sample', createSampleWashermen);
router.get('/washer/all-locations', getAllWashermenLocations);
router.get('/customers-near-laundryman', isAuth, getCustomersNearLaundryman);

module.exports = router;