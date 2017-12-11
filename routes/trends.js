var express = require('express');
var router = express.Router();

router.get('/friendships', function(req, res, next) {
	res.send('Get trends among followed people\'s tweet');
});


router.get('/friendships/:limit', function(req, res, next) {
	res.send('Get trends (max = '+req.params.limit+') among followed people\'s tweet');
});

module.exports = router;