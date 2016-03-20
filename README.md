#timestamp microservice on built on node.js
##this is built for a freecodecamp project

##project discription
The base url shows an html page with instructions on how to use the service. If a date is after the url the service converts the date to natural date and unix date in seconds and send the response as a JSON. If a number is after the url the number is converted into a unix date in seconds and then the unix and natural date are returned as JSON.

##server launch instructions
From the console run:
node server.js

##dependencies
node.js
uses built in node modules:
fs
http
url

##.env file setup
There should be a .env file in the main directory with the url of the service and the port that the server will listen on. Include a slash at the end of the url and do not leave any white space around the url or port. Formatted like:

URL:<theurl>
PORT:<port>

###Example usage:
https://<url_of_timestamp_microservice>/December%2015,%202015
https://<url_of_timestamp_microservice>/1450137600

###Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }