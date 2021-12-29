$(document).ready(function () {

    $('#offcanvasNavbarLabel').html(token.ud_fullname);

    var params = new URL(window.location.href);
    var file_id = params.searchParams.get("id");

    if (file_id != "") {
        $('#update-container').removeClass('d-none');
        $('#upload-container').addClass('d-none');
    }

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

    // Update file ajax
    $('#update-form').on('submit', '', function (e) {

        e.preventDefault();
        var formData = new FormData(this);
        formData.append('uid', token.ud_id);
        formData.append('file_id', file_id);

        $.ajax({
            type: 'POST',
            url: url + 'api/updateFile',
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