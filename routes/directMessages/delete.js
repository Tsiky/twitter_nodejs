var express = require('express');
var router = express.Router();
var async = require("async");
var t = require('../../twitter/twitter_connection');

router.delete('/', function (req, res, next) {
    
    var calls = [];
    //Get all the received direct messages from the authenticated user
    t.setCredentials(req.headers).get('direct_messages', function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            var strQuery = req.query.query;
            //Push all the id of dm having the query string in their text in queue for deletion
            data.forEach(function (element) {
                if (element.text.indexOf(strQuery) !== -1)
                    calls.push(deleteDirectMessage.bind(null, req.headers, element.id_str));
            });
            //Delete all the matching dm in parallel
            async.parallel(
                    calls,
                    function (err, results) {
                        if (err) {
                            res.status(err.statusCode).send(err.message);
                        } else {
                            res.status(200).send(results);
                        }
                    });
        }
    });
});


function deleteDirectMessage(headers, id, callback) {
    t.setCredentials(headers).post('direct_messages/destroy', {id: id}, function (err, data, response) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            console.log(data);
            callback(null, data);
        }
    });
}


module.exports = router;
