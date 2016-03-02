# Assignment 3 - Web Service
Zhuofu Jiang 1000029293
c5jianhb

### Overview
This API provides endpoints to retrieve information from a tweets archive
The technologies used in the server and do not require any other library excecpt the jquery-1.11.3.js library.

###Instructions
- To use any other JSON file, replace the variable JFILE located at the top of node.js and the file must be in the file directory. The default file is 'favs.json' in the directory.
- To run the server, please run "node node.js" in the console

#### Function
1.Ajax
-   localhost:3000/alltweets

Returns all tweets text with time, ID, user available in the file.

-   localhost:3000/allusers

Returns all users with their name and screen_name in the file.

-   localhost:3000/links

Use the regualr experssion to search all the http:// in the file, and return them group by the tweet ID.

-   localhost:3000/searchID/wanted ID

Require the ID as input to search. 
Search the Tweet ID and find if there is a match ID in the file and output its time,id, text and users.

-   localhost:3000/searchName/wanted screen_name

Require the screen_name as input to search. 
Search the user's screen_name and find if there is a match one in the file and output its description, id, url and 
urls.

2. Website

-   localhost:3000

Alltweets button
Returns all tweets text with time, ID, user available in the file.

Allusers button
Returns all users with their name and screen_name in the file.

Allexternal links button
search all the http:// in the file, and return them group by the tweet ID.

Search ID button and input box
Require the ID as input to search. 
Search the Tweet ID and find if there is a match ID in the file and output its time,id, text and users

SearchUser button and input box
Require the screen_name as input to search. 
Search the user's screen_name and find if there is a match one in the file and output its description, id, url and 
urls.


