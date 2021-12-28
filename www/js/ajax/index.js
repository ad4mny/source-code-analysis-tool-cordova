$(document).ready(function () {

    $(".get-started-link").click(function () {
        $("#welcome-container").fadeOut(300, function () {
            $("#welcome-container").addClass('d-none');
            $("#login-container").fadeIn(300);
            $("#login-container").removeClass('d-none');
        });
    });

    $(".login-link").click(function () {
        $("#create-container").fadeOut(300, function () {
            $("#create-container").addClass('d-none');
            $("#login-container").fadeIn(300);
            $("#login-container").removeClass('d-none');
        });
    });

    $(".create-link").click(function () {
        $("#login-container").fadeOut(300, function () {
            $("#login-container").addClass('d-none');
            $("#create-container").fadeIn(300);
            $("#create-container").removeClass('d-none');

        });
    });

    // Login Function
    $('#login-form').on('submit', '', function (e) {

        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: url + 'api/login',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').modal('show');
            },
            success: function (data) {
                console.log(data);
                if (data != null) {
                    localStorage.setItem('token', JSON.stringify(data));
                    location.replace('index.html');
                } else {
                    alert('Incorrect username or password.');
                }
            },
            error: function () {
                $('#notice-container').html('<p class="my-3 text-muted fw-light">Internal server error, please reload.</p>');
            },
            complete: function () {
                $('#progress-container').modal('hide');
            }
        });

    });



});