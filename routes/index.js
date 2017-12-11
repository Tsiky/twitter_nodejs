var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/suggestions/relationships', function(req, res, next) {	
	res.send('Get suggested users based on following / followed relations, not interests');
});

router.get('/suggestions/relationships/:limit', function(req, res, next) {	
	res.send('Get suggested users (max = '+req.params.limit+') based on following / followed relations, not interests');
});

router.get('/commonFollowers/:id_target', function(req, res, next) {	
	res.send('Get users who are both following the authenticated user and the targeted user ('+req.params.id_target+')');
});

router.post('/friendships/lastFollowers/:number', function(req, res, next) {
	 res.send('Follow the last '+req.params.number+' followers of the authenticated user');
});


module.exports = router;