var Twit = require('twit');

// For developpement
// module.exports = new Twit({
//     consumer_key: process.env.CONSUMER_KEY,
//     consumer_secret: process.env.CONSUMER_SECRET,
//     access_token: process.env.ACCESS_TOKEN,
//     access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });

var setCredentials = function (headers) {
    if(headers.consumer_key !== undefined && headers.consumer_secret !== undefined && headers.access_token !== undefined && headers.access_token_secret !== undefined)
    {
        return new Twit({
            consumer_key: headers.consumer_key,
            consumer_secret: headers.consumer_secret,
            access_token: headers.access_token,
            access_token_secret: headers.access_token_secret
        })
    }

    // Return error
    return new Twit({
        consumer_key: 'consumer_key',
        consumer_secret: 'consumer_secret',
        access_token: 'access_token',
        access_token_secret: 'access_token_secret'
    })
};

module.exports = {
    setCredentials: setCredentials
};