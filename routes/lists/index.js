var express = require('express');
var router = express.Router();


router.delete('/', function(req, res, next) {
	res.send('DELETE list containing '+req.query.query_str);
});

module.exports = router;