var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var user = {
        name: 'Trump',
        id: '25073877'
    };
    res.status(205).json(user, [
        { rel: "self", method: "GET", href: 'http://127.0.0.1' },
        { rel: "follow", method: "POST", title: 'Follow user', href: 'https://api.twitter.com/1.1/friendships/create?user_id=' + user.id }
    ]);
    // res.send('respond with a resource');
});

module.exports = router;
