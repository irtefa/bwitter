$(document).ready( function(){
    $(".group-name").live("click", function(e){
        e.preventDefault();
        var group_id = $(this).attr("id");
        $.get("/api/message/" + group_id + "", function(data){
            console.log(data);
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
