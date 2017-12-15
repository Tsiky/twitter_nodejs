var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../../twitter/twitter_connection');

router.get('/', function (req, res, next) {
	var userIds = [];
	var next_cursor=-1;
	t.get('friends/ids', { user_id: "" , stringify_ids:true},  function (err, data, response) {
		if (err) {
			res.status(err.statusCode).send(err.message);
		}
		else {	
			users = data.ids;	

			var calls = []; 
			for (var i = 0; i < users.length; i++) {
				calls.push(getTweet.bind(null, users[i], req.query.limit));
			}

			async.parallel(
					calls,
					function (err, results) {
						if (err) {
							res.status(err.statusCode).send(err.message);
						}
						else {
							var friendsHTs = []
							for (var i = 0; i < results.length; i++) {
								for (var j = 0; j < results[i].length; j++) {        			
									friendsHTs.push(results[i][j]);
								}
							}
							topNHTs = getTopN(friendsHTs,req.query.limit);
							//res.status(200).send(topNHTs);

							
							var calls3 = []; 
							for (var i = 0; i < topNHTs.length; i++) {
								calls3.push(addLink.bind(null, topNHTs[i]))
							}
							async.parallel(
									calls3,
									function (err, results) {
										if (err) {
											res.status(err.statusCode).send(err.message);
										}
										else {
											res.status(200).send(results);
										}
									});
						}
					});	
		}
	});	

});

function getTweet(id, limit, callback) {
	t.get('statuses/user_timeline', { user_id: id , count : 50},  function (err, data, response) {
        if (err) {
        	console.log(err);
            callback(err, null);
        }
        else { 
        	var tweetHTs = []
        	for (var i = 0; i < data.length; i++) {
        		for (var j = 0; j < data[i].entities.hashtags.length; j++) {        			
	        		tweetHTs.push(data[i].entities.hashtags[j].text.toLowerCase());
	        	}
        	}
        	callback(null, tweetHTs);
        }
    });	
}

function getTopN(array, n) {
	var sorted = [];
	for (var i = 0; i < array.length; i++) {
	    var index = -1;
	    for (var j = 0; j < sorted.length; j++) {
	        if (sorted[j].val == array[i]) index = j;
	    }
	    if (index == -1) {
	        sorted.push({val: array[i], count: 1})
	    }
	    else {
	        sorted[index].count++;
	    }
	}
	
	sorted.sort(function(a,b){
		if (a.count > b.count) return -1;
		if (a.count < b.count) return 1;
		return 0;
	})
	
	returnList = [];
	sortedSliced = sorted.slice(0,n);
	for (var i = 0; i < sortedSliced.length; i++) {        			
		returnList.push(sortedSliced[i].val);
	}
	return returnList
}

function addLink(ht, callback) {

	callback(null, json({ hashtag : ht}, [
		{ rel: "searchTrend", method: "GET", title: 'search trend', href: 'http://localhost:3000/tweets/users?q=' + ht}
		]));

}

function json(object, links){

	// grab the object and avoid updating reference.
	var jsonObject = JSON.parse(JSON.stringify(object));



	// either add to existing links collection or add new collection
	jsonObject.links = (jsonObject.links) ? jsonObject.links.concat(links) : jsonObject.links = links;


	return jsonObject
}


module.exports = router;