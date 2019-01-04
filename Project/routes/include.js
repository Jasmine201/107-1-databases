var express = require('express');
var router = express.Router();

const includeController = require('../controllers/include');

router.get('/', includeController.getPId);

router.get('/delete', includeController.getDeleteInclude);

router.get('/edit', includeController.getEditInclude);

router.post('/add', includeController.postAddInclude);

router.post('/update', includeController.postUpdateInclude);

module.exports = router;