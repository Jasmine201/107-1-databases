var express = require('express');
var router = express.Router();

const bookController = require('../controllers/book');

router.get('/', bookController.getBook);

router.get('/delete', bookController.getDeleteBook);

router.get('/edit', bookController.getEditBook);

router.post('/add', bookController.postAddBook);

router.post('/update', bookController.postUpdateBook);

module.exports = router;