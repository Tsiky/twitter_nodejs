var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {	
	
	if(req.query.id_target > -1)
		res.send('Get users who are both following the authenticated user and the targeted user ('+req.query.id_target+')');
	else
		res.send('id_target is required!');
});


module.exports = router;