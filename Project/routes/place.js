var express = require('express');
var router = express.Router();

const placeController = require('../controllers/place');

router.get('/', placeController.getPlace);

router.get('/delete', placeController.getDeletePlace);

router.get('/edit', placeController.getEditPlace);

router.post('/add', placeController.postAddPlace);

router.post('/update', placeController.postUpdatePlace);

module.exports = router;