http = require('http');
fs = require('fs');
path = require('path');
url = require("url");
JFILE = "favs.json"

PORT = 3000;

MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain'
};

http.createServer(function(request, response){
	var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);
    
    
  console.log('Request: ' + request.url);
    
  if (request.url == '/') {
    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });

  }   
     else if (request.url.indexOf('.js') != -1) {
     if (fs.statSync(filename).isDirectory()) filename += '/application.js';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/javascript"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    })}  
    
//background photo
    else if (request.url.indexOf('.png') != -1) {
     if (fs.statSync(filename).isDirectory()) filename += '/Twitter_icon.png';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/png"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    })}
    
//json file     
     else if (request.url.indexOf('.json') != -1) {
     if (fs.statSync(filename).isDirectory()) filename += '/favs.json';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": JFILE});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    })}
    
//all tweets request    
    else if (request.url.indexOf('alltweets') != -1) {
      
      fs.readFile(JFILE, 'utf8', function (err, data) {
          var Jdata = JSON.parse(data);  //change string into json
        if (err) throw err;
         
     var tweets = [];    //save the JSON data into a new array/JSON form as the output
    for(var i = 0; i<Jdata.length;i++){
    var ct = {
      id: Jdata[i].id,
      text: Jdata[i].text,
      name: '@' + Jdata[i].user.screen_name,
      created_at: Jdata[i].created_at,
    };
        tweets.push(ct);
    
  } 
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(tweets));  //pass as the string
        response.end();
      })
    }
    
//all users request    
 else if (request.url.indexOf('allusers') != -1) {
      
       fs.readFile(JFILE, 'utf8', function (err, data) {
          var Jdata = JSON.parse(data);  //change string into json
        if (err) throw err;
         
     var users = [];
    for(var i = 0; i<Jdata.length;i++){
    var ct = {
      name: Jdata[i].user.name,
      screen_name: Jdata[i].user.screen_name,
    };
        users.push(ct);
    
  }        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(users));
        response.end();
      })
    } 
    
 //all links request 
 else if (request.url.indexOf('links') != -1) {
      
       fs.readFile(JFILE, 'utf8', function (err, data) {
          var Jdata = JSON.parse(data);  //change string into json
        if (err) throw err;
var string1 =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;  //regualr expression for http                  
     var links = [];
    for(var i = 0; i<Jdata.length;i++){
        
         var r1 = JSON.stringify(Jdata[i]);             
 if(string1.test(r1)==true){
             //find the right one                 
              var name1 = r1.match(string1);
                var name3 = name1.toString(r1); //change output array to string
                var webs = name3.replace(/,/g,"\n");  //replace , in the match into new line
 }
    var ct = {
      id: Jdata[i].id,
      http: webs,
    };
       links.push(ct);
    
  }   
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(links));
        response.end();
      })
    }        
    
//search ID request    
 else if (request.url.indexOf('searchID') != -1) {
      
      fs.readFile(JFILE, 'utf8', function (err, data) {
          var Jdata = JSON.parse(data);  //change string into json
        if (err) throw err;
          
          var sid = request.url.replace("/searchID/","");//elimate the /searchID/ in the string
         console.log(sid);
     var details = [];
        
    for(var i = 0; i<Jdata.length;i++){
        if(Jdata[i].id==sid){
    var ct = {
      id: Jdata[i].id,
      text: Jdata[i].text,
      name: '@' + Jdata[i].user.screen_name,
    };
        }
        else{
            var ct={
          id: null
            }
        }
        details.push(ct);
    
  } 
          
         console.log(sid);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(details));
        response.end();
      })
    }  
//Search Name request  
 else if (request.url.indexOf('searchName') != -1) {
      
      fs.readFile(JFILE, 'utf8', function (err, data) {
          var Jdata = JSON.parse(data);  //change string into json
        if (err) throw err;
          
          var sid = request.url.replace("/searchName/","");//elimate the /searchID/ in the string
         console.log(sid);
     var details = [];
        
    for(var i = 0; i<Jdata.length;i++){
        if(Jdata[i].user.screen_name==sid){
    var ct = {
         name: Jdata[i].user.name,
         id : Jdata[i].user.id,
        screen_name: Jdata[i].user.screen_name,
        location: Jdata[i].user.location,
          desc : Jdata[i].user.description,
           url : Jdata[i].user.url,
    };
        }
        else{
            var ct={
          name: null
            }
        }
        details.push(ct);
    
  }
         console.log(sid);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(details));
        response.end();
      })
    }    
 //Error return   
    else {
      // Error 404
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    }
}).listen(PORT);

console.log('Server running at http://127.0.0.1:' + PORT + '/');
