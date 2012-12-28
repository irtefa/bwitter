$(document).ready(function() {
    $('#signup-button').click(function(event) {
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

function is_valid_form() {

}
