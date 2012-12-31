$(document).ready(function(){
    // LOAD THINGS ON LOAD
    $.get('/api/dashboard', function(data){
        $("#username").append(data["user_name"]);
        // ADD GROUPS THAT YOU ARE A MEMBER OF
        var i = 0;
        for(i=0; i < data["groups"].length;i++)
        {
            $("#group-list").append("<p class=" + (i+1) +">" + data["groups"][i] + "</p>");
        }
        // ADD GROUPS THAT YOU ARE AN OWNER OF
        for(i=0; i < data["owners"].length;i++)
        {
            $("#owner-list").append("<p group-id=" + data["owner_ids"][i] +">" + data["owners"][i] + "</p>");
        }
        // ADD NOTIFICATIONS
        if (data["notifications"].length === 0)
        {
            $("#notification-list").append("No notifications");
        }
        else
        {
            for(i=0; i < data["notifications"].length;i++)
            {
                $("#notification-list").append("<p>" + data["notificationss"][i] + "</p>");
            }
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
