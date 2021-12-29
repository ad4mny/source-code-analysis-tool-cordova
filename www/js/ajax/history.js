$(document).ready(function () {

    $('#offcanvasNavbarLabel').html(token.ud_fullname);

    // File list ajax
    $.ajax({
        type: 'POST',
        url: url + 'api/getFileList',
        data: {
            uid: token.ud_id
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#display-container').append(
                        '                <div class="row m-1 py-1 shadow-sm border rounded-3">' +
                        '                    <div class="col-12 m-auto position-relative">' +
                        '                            <a class="btn btn-sm text-start w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">' +
                        '                               <p class="mb-0 text-truncate">' + data[i].fd_name + '</p>' +
                        '                               <small class="mb-0 text-truncate text-muted fw-light">' + data[i].fd_log + '</small>' +
                        '                               <div class="position-absolute end-0 top-50 translate-middle">' +
                        '                                 <i class="fas fa-chevron-down fa-fw"></i>' +
                        '                               </div>' +
                        '                            </a>' +
                        '                            <ul class="dropdown-menu">' +
                        '                                <li>' +
                        '                                    <a href="result.html?id=' + data[i].fd_id + '" class="dropdown-item">' +
                        '                                        View' +
                        '                                    </a>' +
                        '                                </li>' +
                        '                                <li>' +
                        '                                    <a href="#" class="dropdown-item" value="' + data[i].fd_id + '"  data-bs-toggle="modal" data-bs-target="#uploadModal">' +
                        '                                        Update' +
                        '                                    </a>' +
                        '                                </li>' +
                        '                                <li>' +
                        '                                    <a href="#" class="dropdown-item delete-btn" id="' + data[i].fd_id + '">' +
                        '                                        Delete' +
                        '                                    </a>' +
                        '                                </li>' +
                        '                            </ul>' +
                        '                    </div>' +
                        '                </div>'
                    );
                }
            } else {
                $('#display-container').append(
                    '<div class="row m-1 py-1 shadow-sm border rounded-3">' +
                    '<div class="col-12 m-auto ">' +
                    '<p class="text-muted fw-light">No file history available.</p>' +
                    '</div>' +
                    '</div>'
                );
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

    // Delete file ajax
    $(document).on('click', '.delete-btn', function (e) {

        $.ajax({
            type: 'POST',
            url: url + 'api/deleteFile',
            data: {
                uid: token.ud_id,
                file_id: this.id
            },
            dataType: 'JSON',
            beforeSend: function () {
                $('#progress-container').show();
            },
            success: function (data) {

                if (data != false) {
                    alert('File deleted.');
                } else {
                    alert('Unable to delete the selected file');
                }

                location.reload();
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