const router = require('express').Router();
const { activity } = require('../controllers/activityController');

router.get('/', activity);

module.exports = router;
