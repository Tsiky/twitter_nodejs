var express = require('express');
var router = express.Router();

router.delete('/', function(req, res, next) {
//	if(req.query.number > -1)
//		res.send('Delete all direct messages containing the query string ('+req.query.str_query+')');
//	else
//		res.send('str_query is required!');
	
	
	if(req.query.str_query > -1)
		res.send('Delete all direct messages containing the query string ('+req.query.str_query+')');
	else
		res.send('str_query is required!');
});

module.exports = router;