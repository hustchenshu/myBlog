$(function(){ 
    $("#login").click(function(){ 
        var username = $("#username").val();
        var password = $("#password").val();

        var data = {"uname":username,"upwd":password};
        $.ajax({ 
            url: '/users/login',
            type: 'post',
            data: data,
            success: function(data,status){ 
               
                if(data == 'success'){ 
                    location.href = '/';
                }else{
                     alert(data);
                }
            },
            error: function(data,err){ 
                location.href = '/users/register';
            }
        }); 
    });

    
    $("#register").click(function(){ 
        var username = $("#username").val();
        var password = $("#password").val();
        var password1 = $("#password1").val();
        if(password !== password1){ 
            $("#password").css("border","1px solid red");
            $("#password1").css("border","1px solid red");
        }else if(password === password1){
            var data = {"uname":username,"upwd":password};
            $.ajax({ 
                url: '/users/register',
                type: 'post',
                data: data,
                success: function(data,status){ 
                    if(data == 'success'){ 
                        location.href = '/users/login';
                    }else{
                        alert(data); 
                    }
                },
                error: function(data,err){
                    alert(''); 
                        //location.href = '/users/register';
                }
            }); 
        }
    });

    

});