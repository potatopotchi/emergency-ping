const express = require('express');
const { requireAuthentication } = require('../middleware/auth');
const { getNearest } = require('../controllers/locationsController');


const router = express.Router();

router.use(requireAuthentication);

router.get('/nearest', getNearest);


module.exports = router;
