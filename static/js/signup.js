$(document).ready(function() {
    $('#signup-button').click(function(event) {

        validate_entry("username");
        validate_entry("firstname");
        validate_entry("lastname");
        validate_entry("password");
        validate_entry("useremail");
        validate_entry("confirm");

        if (is_valid_form())
        {
            $('#invalid-form').addClass('hidden');
            signup(event);
        }
        else
        {
            $('#invalid-form').removeClass('hidden');
        }
    });
});

function signup(event) {
    var user_name = $('#user-name').val();
    var first_name = $('#first-name').val();
    var last_name = $('#last-name').val();
    var user_email = $('#user-email').val();
    var pass_word = $('#pass-word').val();

    var post_data = {
        "user_name": user_name,
        "first_name": first_name,
        "last_name": last_name,
        "user_email": user_email,
        "pass_word": pass_word
    };

    $.ajax({
        url: '/api/signup',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(post_data),
        success: function(data) {
            if (data.success === "true")
            {
                window.location.replace("/profile");
            }
            else
            {
                $('#database-error').removeClass('hidden');
            }
        }
    });
}

function validate_entry(id)
{
    if (id==="username")
    {
        var u_name = $("#user-name").val();
        if (u_name.length < 6 || u_name.length > 13)
        {
            $("#username-group").removeClass("success");
            $("#username-help").removeClass("hidden");
            $("#username-group").addClass("error");
        }
        else
        {
            $("#username-group").removeClass("error");
            $("#username-group").addClass("success");
            $("#username-help").addClass("hidden");
        }
    }
    else if(id==="firstname")
    {
        var f = $("#first-name").val();
        if(f.length > 0)
        {
            $("#firstname-group").removeClass("error");
            $("#firstname-group").addClass("success");
            $("#username-help").addClass("hidden");
        }
        else
        {
            $("#firstname-group").addClass("error");
            $("#firstname-group").removeClass("success");
            $("#firstname-help").removeClass("hidden");
        }
    }
    else if(id==="lastname")
    {
        var l = $("#last-name").val();
        if(l.length > 0)
        {
            $("#lastname-group").removeClass("error");
            $("#lastname-group").addClass("success");
            $("#lastname-help").addClass("hidden");
        }
        else
        {
            $("#lastname-group").addClass("error");
            $("#lastname-group").removeClass("success");
            $("#lastname-help").removeClass("hidden");
        }
    }
    else if (id==="password")
    {
        var pwd = $("#pass-word").val();
        if (pwd.length < 6 || pwd.length > 13)
        {
            $("#password-group").removeClass("success");
            $("#password-help").removeClass("hidden");
            $("#password-group").addClass("error");
        }
        else
        {
            $("#password-group").removeClass("error");
            $("#password-group").addClass("success");
            $("#password-help").addClass("hidden");
        }
    }

    else if(id==="useremail")
    {
        var email = $("#user-email").val();
        var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (pattern.test(email))
        {
            $("#useremail-group").removeClass("error");
            $("#useremail-group").addClass("success");
            $("#useremail-help").addClass("hidden");
        }
        else
        {
            $("#useremail-group").removeClass("success");
            $("#useremail-help").removeClass("hidden");
            $("#useremail-group").addClass("error");
        }
    }
    else if(id==="confirm")
    {
        var pd = $("#pass-word").val();
        var cnf  = $("#confirm-pass").val();

        if(pd === cnf && cnf.length > 0)
        {
             $("#confirm-group").removeClass("error");
            $("#confirm-group").addClass("success");
            $("#confirm-help").addClass("hidden");
        }
        else
        {
            $("#confirm-group").removeClass("success");
            $("#confirm-help").removeClass("hidden");
            $("#confirm-group").addClass("error");
        }

    }

}

function is_valid_form() {
  var is_valid = !($("#username-group").hasClass("error") ||
                        $("#password-group").hasClass("error") ||
                        $("#confirm-group").hasClass("error") ||
                   $("#useremail-group").hasClass("error")) &&
                   $("#user-name").val().length !== 0 &&
                   $("#first-name").val().length !== 0 &&
                   $("#last-name").val().length !== 0 &&
                   $("#user-email").val().length !== 0 &&
                   $("#confirm-pass").val().length !== 0 &&
                   $("#pass-word").val().length !== 0;
  return is_valid;
}
