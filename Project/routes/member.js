var express = require('express');
var router = express.Router();

const memberController = require('../controllers/member');

router.get('/', memberController.getMember);

router.get('/delete', memberController.getDeleteMember);

router.get('/edit', memberController.getEditMember);

router.post('/add', memberController.postAddMember);

router.post('/update', memberController.postUpdateMember);

module.exports = router;