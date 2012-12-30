$(document).ready(function(){
      $.get('/api/dashboard', function(data){
        $("#user-name").append(data["user_name"]);
    });
});
