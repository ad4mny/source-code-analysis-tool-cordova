$(document).ready(function () {

    $('#offcanvasNavbarLabel').html(token.ud_fullname);

    // Upload file ajax
    $('#upload-form').on('submit', '', function (e) {

        e.preventDefault();
        var formData = new FormData(this);
        formData.append('uid', token.ud_id);

        $.ajax({
            type: 'POST',
            url: url + 'api/uploadFile',
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (
                    Array.isArray(data) &&
                    data !== null
                ) {
                    location.replace(data);
                } else {
                    alert(data);
                }

            },
            error: function () {
                $('#notice-container').html(
                    '<small class="text-danger fw-light">' +
                    '<i class="fas fa-exclamation-triangle me-1 fa-fw"></i>500: Internal Server Error.' +
                    '</small>'
                );
            },
            complete: function () {
                $('#progress-container').hide();
            }
        });

    });

});