$(document).ready(function() {
    $("#login-button").click(function(){
    var user_name = $("#user-name").val();
    var pass_word = $("#pass-word").val();

    var post_data = {
        "user_name": user_name,
        "pass_word": pass_word
    };
  $.ajax({
    url:'/api/login',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(post_data),
    success: function(data){
        if(data.success === "success")
        {
            $("#unregistered-user").addClass("hidden");
            $("#useremail-error").addClass('hidden');
            $("#database-error").addClass('hidden');
            window.location.replace("/profile");
        }
        else if(data.success === "unregistered-user")
        {
            $("#unregistered-user").removeClass("hidden");
            $("#useremail-error").addClass("hidden");
            $("#database-error").addClass("hidden");
        }
        else if(data.success === "useremail-error")
        {
            $("#unregistered-user").addClass("hidden");
            $("#useremail-error").removeClass("hidden");
            $("#database-error").addClass("hidden");
        }
        else if(data.success === "database-error")
        {
            $("#unregistered-user").addClass("hidden");
            $("#useremail-error").addClass("hidden");
            $("#database-error").removeClass("hidden");
        }
    }
  });
});
});
