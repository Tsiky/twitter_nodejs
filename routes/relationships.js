var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id_target', function(req, res, next) {
	res.send('Get the relationship between the authenticated user and ('+req.params.id_target+')');
});

module.exports = router;