# twitter_nodejs

## Build Setup

``` bash
# install dependencies
npm install

# run at localhost:3000
npm start

# Example
GET http://localhost:3000/tweets/
GET http://localhost:3000/tweets/from/cfarre
POST http://localhost:3000/tweets/
with body
{
    "message": "Super tweet"
}
```

## Add routes

``` bash
# Add new routes
.js files in /routes/

# Include new routes
add a line following the previous examples in app.js under the two 'ADD HERE' comment
```

## Additional info

``` bash
# Nodemon : automatically restart the application after changes
npm install -g nodemon
then use 'nodemon' instead of 'npm start'

# Connection with Twitter API
https://apps.twitter.com/
Create new app > Keys and Access Tokens > Create my access token

# Environment variables
Create a file named '.env' at the root of the project with the variables :
CONSUMER_KEY=value
CONSUMER_SECRET=value
ACCESS_TOKEN=value
ACCESS_TOKEN_SECRET=value
```
