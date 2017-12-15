# Advanced API for Twitter

## Connection with Twitter API
``` bash
# Tokens
https://apps.twitter.com/
Create new app > Keys and Access Tokens > Create my access token
```

## For users
``` bash
# URL
https://advanced-twitter-api.herokuapp.com/

# Headers required for each request
consumer_key:value
consumer_secret:value
access_token:value
access_token_secret:value

# Documentation
https://app.swaggerhub.com/apis/webServices/Common_twitter/4.0
```

## For developers
``` bash
# install dependencies
npm install

# run at localhost:5000
npm start

# Nodemon : automatically restart the application after changes
npm install -g nodemon
then use 'nodemon' instead of 'npm start'

# Environment variables
Create a file named '.env' at the root of the project with the variables :
CONSUMER_KEY=value
CONSUMER_SECRET=value
ACCESS_TOKEN=value
ACCESS_TOKEN_SECRET=value
```
