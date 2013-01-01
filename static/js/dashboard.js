$(document).ready(function(){
    // LOAD THINGS ON LOAD
    $.get('/api/dashboard', function(data){
        $("#username").append(data["user_name"]);
        // ADD GROUPS THAT YOU ARE A MEMBER OF
        var i = 0;
        for(i=0; i < data["groups"].length;i++)
        {
            $("#group-list").append("<div class='control-group' id='groupname-group'><strong> Write a message for your friends</strong><input id='form-msg' class='input-large' rows='1' type='text' placeholder=''></input><button class='btn' id='" + data['group_ids'][i] + "'>Submit</button></div>");
            $("#group-list").append("<p class='group-name' id='" + data["group_ids"][i] + "'>" + data["groups"][i] + "</p><hr>");
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
                    window.location.replace('/dashboard');
                }
                else if(data.success === "group-exists")
                {
                    $('#group-help').removeClass('hidden');
                }
            }
        });
    });
});

/*
                "<div class='control-group' id='username-group'>
                    <strong> Username should be between 6 and 13 characters long.</strong>
                    <label class='control-label'>Username:</label>
                    <div class='controls'>
                        <input id='user-name' class='input-large' rows='1' type='text' placeholder=''></input>
                        <span class='help-inline hidden' id='username-help'>Username should be between 6 and 13 characters.</span>
                    </div>
                </div>"

*/
