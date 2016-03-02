JFILE = "favs.json"

$(document).ready(function(){
  
    //output all tweets
   $('#b1').on('click', function(e){
        $("#output").empty();
         $.ajax({url: "/alltweets", success: function(response){    
          var result = JSON.parse(response);   //JSON the string data from the application.js
			$.each(result, function(i, result){ 
             var Time = result.created_at;
             var ID = result.id;
             var Tweet = result.text;
             var user = result.name;
             $("#output").append("<p> <b> Tweet text : </b> " + Tweet + "</br>" + " </p>");
             $("#output").append("<p> <b> Tweet Time : </b> " + Time + "</br>" + " </p>");
             $("#output").append("<p> <b> Tweet user : </b> " + user + "</br>" + " </p>");
             $("#output").append("<p> <b> Tweet ID : </b>" + ID + "</br> </br> </br>" + " </p>");
				
			});
             }});
	});
    
    //output all users
     $('#b2').on('click', function(e){
         $("#output").empty();
		   $.ajax({url: "/allusers", success: function(response){
            var result = JSON.parse(response);
                 $.each(result, function(i, result){
             var name = result.name;
            var sname = result.screen_name;         
             $("#output").append("<p> <b> Name  : </b>" + name + "</br>" + " </p>");
             $("#output").append("<p> <b> Screen name : </b>" + sname + "</br> </br> </br>" + " </p>");          
			});
        }});
		
	});
    //output the external links in the tweets
    $('#b3').on('click', function(e){
        $("#output").empty();
		  $.ajax({url: "/links", success: function(response){          
          var result = JSON.parse(response);
          $.each(result, function(i, result){           
          var id = result.id;
          var webs = result.http;
         $("#output").append("<p> <b> Tweet id : </b>" + id + " </br>" + webs + "</br>" + " </p>"); 
		});
	}});
    });
        
    //search ID
    $('#b4').on('click', function(e){
        $("#output").empty();
        var sid = document.getElementsByTagName("input")[0].value; 
        var s_id = sid.toString();
        var foundid = false; //check id is found
	$.ajax({url: "/searchID/"+s_id, success: function(response){      
		   var result = JSON.parse(response);
            $.each(result, function(i, result){
            if(result.id!=null) {//find the ID 
           var Time = result.created_at;
             var ID = result.id;
             var Tweet = result.text;
                var name = result.name;
                foundid=true;
             $("#output").append("<p> <b> Tweet text : </b>" + Tweet + "</br>" + " </p>");
             $("#output").append("<p> Tweet Time : " + Time + "</br>" + " </p>");
                $("#output").append("<p> name : " + name + "</br>" + " </p>");
             $("#output").append("<p> Tweet ID : " + ID + "</br> </br> </br>" + " </p>");          
			}
            });
        
        if(foundid==false){
                $("#output").append("<p> Cannot find the id</br> </p>");
             }
      		}});
      
	});
    
   //search Username
    $('#b5').on('click', function(e){
        $("#output").empty();
        var sname = document.getElementsByTagName("input")[1].value; ;
        var s_name = sname.toString();
        var foundname = false; //check if the name is found
		$.ajax({url: "/searchName/"+s_name, success: function(response){
		     var result = JSON.parse(response);
        $.each(result, function(i, result){
        if(result.name != null ){ //find the screen_name
          var name = result.name;
          var id = result.id;
          var screen_name = result.screen_name;
          var location = result.location;
          var desc = result.desc;
          var url = result.url;
           foundname=true;       
             $("#output").append("<p> <b> Username : </b> " + name + "</br>" + " </p>");
             $("#output").append("<p> <b> id : </b>" + id + "</br>" + " </p>");
			 $("#output").append("<p> <b> screen_name: </b> " + screen_name + "</br>" + " </p>");
             $("#output").append("<p> <b> location : </b> " + location + "</br>" + " </p>");
             $("#output").append("<p> <b> description : </b> " + desc + "</br>" + " </p>");
             $("#output").append("<p> <b> url : </b>" + url + "</br> </br> </br>" + " </p>");      
           }         
			});
            
         if(foundname==false){  //cant find
                $("#output").append("<p> Cant find the user</br> </p>");
             }
		}});      
	});  


});
