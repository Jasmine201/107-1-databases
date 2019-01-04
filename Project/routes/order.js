var express = require('express');
var router = express.Router();

const orderController = require('../controllers/order');

router.get('/', orderController.getOrder);

router.get('/delete', orderController.getDeleteOrder);

router.get('/edit', orderController.getEditOwner);

router.post('/add', orderController.postAddOrder);

router.post('/update', orderController.postUpdateOrder);

module.exports = router;