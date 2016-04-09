var express = require('express');
var app = express();
mongoose = require('mongoose');
var bodyParser = require("body-parser");
mongoose.connect('mongodb://localhost/ergo_cycle');
app.set('view engine', 'jade');
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var Business = require(__dirname + '/js/business.js');
var Users = require(__dirname + '/js/users.js');
//start page
app.get('/', function (req, res) {
	res.render(__dirname + '/start.jade');
});

app.get('/map', function (req, res) {
	res.render(__dirname + '/index.jade');
});

app.get('/Login',function(req,res){
        res.render(__dirname + '/login.jade');
});

app.get('/Register',function(req,res){
        res.render(__dirname + '/registration.jade');
     });

app.get('/Business',function(req,res){
    var biz;
    Business.find({},function(error,business){
         biz=business;
     }); 
        res.render(__dirname + '/business.jade');
     });
//business information
app.get('/business/:id', function (req, res) {
	var biz;
	Business.findById(req.params.id, function(error, business) {
          biz = business;
    });
    console.log(biz);
	res.render(__dirname + '/business.jade', {
		business: biz,
	});
});

app.get('/business/name/:name', function (req, res) {  
	var biz; 
    var search_log ='cant find';
    
   Business.findOne({name:req.params.name}, function(error, business) {
          biz = business;
    });
   
    console.log(biz);
    
	res.render(__dirname + '/business.jade', {
		business: biz,
	});
});

app.get('/business/address/:name', function (req, res) { 
	var biz; 
    var search_log ='cant find';
    
   Business.findOne({address:req.params.address}, function(error, business) {
          biz = business;
    });
   
    console.log(biz);
    
	res.render(__dirname + '/business.jade', {
		business: biz,
	});
});

//check the login 
app.post('/Login/submit',function(req, res){
    var result;
    console.log("submit job");
    console.log(req.body.username);
    console.log(req.body.password);
    var user_name=req.body.username;
    var password=req.body.password;
    
    Users.findOne({username:user_name},function(error,user){ //username has been used 
        if(user!=null){
        Users.findOne({password:password},function(error,user){
           if(user!=null){
               result = "success";
                res.send(result);
           }
               else{
                   result = 'wrong password';
                   res.send(result);
               } 
           }); 
        }
            else{                
                   result ='wrong User';
                 res.send(result);
               }
    });
    
  
   
});


//api setups
var api = require(__dirname + '/js/api.js');
app.post('/Reg/submit',api.Uinsert);  //post function


//output all the api if needed
app.get('/api/:id', api.Bfind);
app.get('/all', api.BshowAll);
app.get('/api/business/name/:name',api.BfindName); //shop name
app.get('/api/business/address/:address',api.BfindAddress); //shop address
app.get('/add-business', api.Binsert);

//user api
app.get('/Uall', api.UshowAll);
app.get('/add-users', api.Uinsert);
app.get('/api/users/email/:address',api.UfindEmail);
app.get('/api/users/name/:name',api.UfindName);  //user name



app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});



