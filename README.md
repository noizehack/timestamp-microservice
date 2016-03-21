#timestamp microservice on built on node.js
##this is built for a freecodecamp project
[freecodecamp](https://www.freecodecamp.com)

##project discription
The base url shows an html page with instructions on how to use the service. If a date is after the url the service converts the date to natural date and unix date in seconds and send the response as a JSON. If a number is after the url the number is converted into a unix date in seconds and then the unix and natural date are returned as JSON. If the input is not a valid date the output will be null for unix time and natural time.

##server launch instructions
From the console run:

    node server.js

Or on Heroku the Procfile should launch the server automatically

##dependencies
* node.js
* uses built in node modules:
 * fs
 * http

###Example inputs:

https:www.example.com/timestampMicroservice/December%2015,%202015

https:www.example.com/timestampMicroservice/1450137600

###Example output:

{ "unix": 1450137600, "natural": "December 15, 2015" }

{ "unix": null, "natural": null }