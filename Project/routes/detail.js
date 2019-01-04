var express = require('express');
var router = express.Router();

const detailCOntroller = require('../controllers/detail');

router.get('/', detailCOntroller.getDetail);

router.get('/delete', detailCOntroller.getDeleteDetail);

router.get('/edit', detailCOntroller.getEditDetail);

router.post('/add', detailCOntroller.postAddDetail);

router.post('/update', detailCOntroller.postUpdateDetail);

module.exports = router;