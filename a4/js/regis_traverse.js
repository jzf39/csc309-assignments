//Code snippet source from http://www.formget.com/multi-step-form-using-jquery-and-css3/

$(document).ready(function() {
    var count = 0; 

    $(".submit_btn").click(function(event) {

        var radio_check = $('.rad'); 
        var input_field = $('.text_field'); 
        var text_area = $('textarea');

        var email,pass,cpass,fname,lname,cont,gender,b_name,b_cont,b_address;
        email=$("input[name=email]").val();
        pass=$("input[name=pass]").val();
        cpass=$("input[name=cpass]").val();
        fname=$("input[name=fname]").val();
        lname=$("input[name=lname]").val();
        cont=$("input[name=cont]").val();
        gender=$("input[name=gender]").val();
        b_name=$("input[name=b_name]").val();
        b_cont=$("input[name=b_cont]").val();
        b_address=$("input[name=b_address]").val();
        
        
        if (radio_check[0].checked == false && radio_check[1].checked == false) {
            var y = 0;
        } else {
            var y = 1;
        }
        
        for (var i = input_field.length; i > count; i--) {
            if (input_field[i - 1].value == '' || text_area.value == '') {
                count = count + 1;
            } else {
                count = 0;
            }
        }
        if (count != 0 || y == 0) {
            alert("*All Fields are mandatory*");
            event.preventDefault();
        } else {
              $.post("http://localhost:3000/Reg/submit",{username: email,password: pass,cpass:cpass,b_name:b_name, b_cont: b_cont,b_address:b_address}, function(data){
            if(data==="Created Business"||data=="Create Normal user")
              {
                alert(data);
                window.location = 'http://localhost:3000';
              }
              
              else{
                  alert(data);
              }
          });
        }
    });
    $(".next_btn").click(function() { 
        $(this).parent().next().fadeIn('slow');
        $(this).parent().css({
            'display': 'none'
        });
        $('.active').next().addClass('active');
    });
    $(".pre_btn").click(function() { 
        $(this).parent().prev().fadeIn('slow');
        $(this).parent().css({
            'display': 'none'
        });
        $('.active:last').removeClass('active');
    });
   
});