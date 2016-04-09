var Business = require(__dirname + '/business.js');
var Users = require(__dirname + '/users.js');

exports.BshowAll = function(req, res) {
	Business.find(function(err, businesses) {
		res.send(businesses);
	});
}

exports.UshowAll = function(req, res) {
 
    Users.find(function(err, user) {
		res.send(user);
	});
    
    
}

exports.Binsert = function(req, res) {
	 res.send(req.query);
    
	new Business({username: req.query.username, 
		password: req.query.password,
		email: req.query.email,
		phone: req.query.phone,
		name: req.query.name,
		address: req.query.address,
	}).save();
    
}

exports.Bfind = function(req, res) {
    Business.findById(req.params.id, function(error, business) {
          res.send(business);
    });
}

exports.BfindName = function(req, res) {
    Business.findOne({name:req.params.name}, function(error, business) {
          res.send(business);
    });
}

exports.BfindAddress = function(req, res) {
    Business.findOne({address:req.params.address}, function(error, business) {
          res.send(business);
    });
}


exports.Uinsert = function(req, res) {

if(req.body.password != req.body.cpass){
    res.send("password not the same")
}    
    
else{
    
    var username =req.body.username;
    var password = req.body.password;
    var b_name = req.body.b_name;
   var b_address = req.body.b_address;
    var b_cont = req.body.b_cont;
    console.log(b_address);
	var created = new Users({
        username: username, 
		password: password,
        email: username,
	});
    
    created.save(function(err){
        
      if(!err){
          if(b_name!=null){
      var createB = new Business({
        username: username, 
		password: password,
		email: username,
		phone: b_cont,
		name: b_name,
		address: b_address,
	});
    createB.save(function(err){
      if(!err){
        res.send("Created Business");
      }else{
          console.log(err);
        res.send("Cant created,already in used");
            }
    });
              
          }  
       else{
            res.send("Create Normal user");
                 }
              }
        else{
          console.log(err);
        res.send("Cant created,already in used");
      }
    });    
}
}


 
              



/*
exports.Uinsert = function(req, res) {
    
	 console.log("here");
     console.log(req.body.username);
     console.log(req.body.phone);
    var phone = req.body.phone;
    var result;
    var username = req.body.username;
    var pass = req.body.password;
    
 Users.findOne({username:req.body.username}, function(error, user) {
        if(user!=null){ 
        res.send("Username is used");
        }
    }); 
    
	var created = new Business({
        username: req.body.username, 
		password: req.body.password,
		phone: req.body.phone,
	});
    created.save(function(err){
      if(err){
        res.send("Created");
      }else{
        res.send("Cant created");
      }
    });
    
}*/

exports.Ufind = function(req, res) {
    Users.findById(req.params.id, function(error, user) {
          res.send(user);
    });
}

exports.UfindName = function(req, res) {
  Users.findOne({username:req.params.name}, function(error, user) {
          res.send(user);
    });
}

exports.UfindEmail = function(req, res) {
    Users.findOne({email:req.params.address}, function(error, user) {
          res.send(user);
    });
}

