var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('Get the relationship between the authenticated user and (' + req.query.id_target + ')');
});

module.exports = router;