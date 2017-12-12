var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {	
	
	if(req.query.number > -1)
		res.send('Follow the last '+req.query.number+' followers of the authenticated user');
	else
		res.send('Follow the last followers of the authenticated user');
});


module.exports = router;