var express = require('express');
var router = express.Router();

router.delete('/:str_query', function(req, res, next) {
    res.send('Delete all direct messages containing the query string ('+req.params.str_query+')');
});

module.exports = router;