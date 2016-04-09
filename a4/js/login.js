 $(document).ready(function(){
  
        var user,pass;
        $("#submit").click(function(){
              
            
          username=$("#username").val();
          password=$("#password").val();
          //post function to pass the data to server.js 
          $.post("http://localhost:3000/Login/submit",{username: username,password: password}, function(data){
            if(data==="success")
              {
                alert("login success");
                window.location = 'http://localhost:3000/map';
              }
              
              else{
                  alert(data);
              }
          });
        });
      });