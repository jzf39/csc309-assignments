var current_fs, next_fs, previous_fs;
 var left, opacity, scale;
 var animating;

 $(document).ready(function(){
 $(".next").click(function(){
     
     var user = $("#user").val();
     var password = $("#password").val();
     var conf_pass=$("#conf_pass").val();
     
     $.post("http://locahost:3000/Regisiter/submit",{user user,password password,conf_pass conf_pass},function(data){
         if(data=='done')
             {
                 alert("regisiter success");
             }
     });
     
 	if(animating) return false;
 	animating = true;
 	
 	current_fs = $(this).parent();
 	next_fs = $(this).parent().next();
 	
 	$("#info_bar li").eq($("div").index(next_fs)).addClass("active");
 	
 	next_fs.show(); 
 	current_fs.animate({opacity: 0}, {
 		step: function(now, mx) {
 			scale = 1 - (1 - now) * 0.2;
 			left = (now * 50)+"%";
 			opacity = 1 - now;
 			current_fs.css({
         'transform': 'scale('+scale+')',
         'position': 'absolute'
       });
 			next_fs.css({'left': left, 'opacity': opacity});
 		}, 
 		duration: 800, 
 		complete: function(){
 			current_fs.hide();
 			animating = false;
 		}, 
 		easing: 'easeInOutBack'
 	});
 });
 
 $(".previous").click(function(){
 	if(animating) return false;
 	animating = true;
 	
 	current_fs = $(this).parent();
 	previous_fs = $(this).parent().prev();
 	
 	$("#info_bar li").eq($("div").index(current_fs)).removeClass("active");
 	
 	previous_fs.show(); 
 	current_fs.animate({opacity: 0}, {
 		step: function(now, mx) {
 			scale = 0.8 + (1 - now) * 0.2;
 			left = ((1-now) * 50)+"%";
 			opacity = 1 - now;
 			current_fs.css({'left': left});
 			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
 		}, 
 		duration: 800, 
 		complete: function(){
 			current_fs.hide();
 			animating = false;
 		}, 
 		easing: 'easeInOutBack'
 	});
 });
 
 $(".submit").click(function(){
 	return false;
 })
 });