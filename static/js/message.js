$(document).ready( function(){
    $("#pubfeed").live("click", function(e){
        e.preventDefault();
        $.get("/api/pubfeed", function(data){
            var j = 0;
            $("#pubfeed-list").empty();
            for(j = 0; j < data.length; j++)
            {
                $("#pubfeed-list").append(data[j]["content"]);
            }
        });
    });
    $(".group-name").live("click", function(e){
        e.preventDefault();
        var group_id = $(this).attr("id");
        $.get("/api/message/" + group_id + "", function(data){
            if(global_data_array.length > 0)
            {
                var k;
                for(k=0; k < global_data_array.length; k++)
                {
                    $("#message-list" + global_data_array[k] + "").empty();
                }
            }
            global_data_array.push(group_id);
            var i =0;
            $("#message-list"+group_id+"").empty();
            for(i=0; i < data.length; i++)
            {
                $("#message-list"+group_id+"").append(data[i]["content"]);
                $("#message-list"+group_id+"").append("<hr>");
            }
        });
    });

    $(".btn").live("click", function(e){
        var content = $(this).prev().val();
        var group_id = $(this).attr("id");
        var timestamp = new Date().toISOString();
        var post_data = {
            "content": content,
            "group_id": group_id,
            "timestamp": timestamp
        };
        $.ajax({
            url: '/api/message',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(post_data),
            success: function(data) {
                if (data.success === "true")
                {
                    window.location.replace('/dashboard');
                }
            }
        });
    });
  });
