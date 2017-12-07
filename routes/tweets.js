var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('GET tweet');
});

router.get('/special', function(req, res, next) {
    res.send('special tweet');
});

router.post('/', function(req, res, next) {

    // Error example
    var error = true;
    var errorMessage = 'Super error';
    var errorCode = 501;
    var result = 'Super result'

    if (error) {
        res.status(errorCode).send({ 'Error': errorMessage });
    }
    else {
        res.status(200).send({ 'result': result });
    }
});

router.put('/', function(req, res, next) {
    res.send('PUT tweet');
});

router.delete('/', function(req, res, next) {
    res.send('DELETE tweet');
});


module.exports = router;
