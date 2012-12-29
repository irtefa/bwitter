$(document).ready(function() {
    $('#signup-button').click(function(event) {

        validate_entry("username");
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
    console.log(post_data);
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
            $("#username-group").addClass("hidden");
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
        var pd = $("#password").val();
        var cnf  = $("#confirm-pass").val();

        if(pd === cnf)
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

}
