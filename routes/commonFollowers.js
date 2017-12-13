var express = require('express');
var router = express.Router();
var t = require('../twitter/twitter_connection');

router.get('/', function(req, res, next) {	
	var otherUserIds;
	if(req.query.id_target > -1) {
		t.get('followers/ids', { user_id: req.query.id_target },  function (err, data, response) {
	        if (err) {
	            res.status(err.statusCode).send("1 - "+err.message);
	        }
	        else {
	        	otherUserIds = data.ids;
	        	req.query.id_target="";
	        	t.get('followers/ids', { user_id: req.query.id_target },  function (err, data, response) {
	    	        if (err) {
	    	            res.status(err.statusCode).send("2 - "+err.message);
	    	        }
	    	        else {
	    	        	myIds = data.ids;
	    	        	res.status(200).send(intersect(otherUserIds,myIds)); //for some reasons some users seems not existent
	    	        }
	    	    });	
	        }
	    });		
	}
	else
		res.send('id_target is required!');
});


function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}



module.exports = router; 