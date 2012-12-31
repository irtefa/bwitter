$(document).ready(function(){
    // LOAD THINGS ON LOAD
    $.get('/api/dashboard', function(data){
        $("#username").append(data["user_name"]);
        var i = 0;
        for(i=0; i < data["groups"].length;i++)
        {
            $("#group-list").append("<p class=" + (i+1) +">" + data["groups"][i] + "</p>");
        }
    });
    // CREATE GROUP ON CLICK
    $("#creategroup-button").live('click', function(event){
        post_data = {
            "group_name": $("#create-group").val()
        };
        $.ajax({
            url: '/api/creategroup',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(post_data),
            success: function(data) {
                if (data.success === "true")
                {
                    $("#group-help").addClass('hidden');
                }
                else if(data.success === "group-exists")
                {
                    $('#group-help').removeClass('hidden');
                }
            }
        });
    });
});
