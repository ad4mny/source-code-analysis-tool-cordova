$(document).ready(function () {

    $('#offcanvasNavbarLabel').html(token.ud_fullname);

    var params = new URL(window.location.href);
    var file_id = params.searchParams.get("id");

    // View result ajax
    $.ajax({
        type: 'POST',
        url: url + 'api/getResult',
        data: {
            uid: token.ud_id,
            file_id: file_id
        },
        dataType: 'JSON',
        beforeSend: function () {
            $('#progress-container').show();
        },
        success: function (data) {

            if (
                typeof data === 'object' &&
                !Array.isArray(data) &&
                data !== null
            ) {
                var result;
                var history = [];

                if (data['errors'] == 0) {
                    result = '<p class="text-success">Your file is good, no possible SQL injection flaws detected.</p>';
                } else {
                    result = '<p class="text-danger">' + data['errors'] + ' Warning(s) detected!</p>';
                }

                $('#file-info').append(
                    '        <small class="text-muted">RESULT</small>' +
                    '        ' + result +
                    '        <small class="text-muted">FILE NAME</small>' +
                    '        <p>' + data["file"] + '</p>' +
                    '        <small class="text-muted">TIME TAKEN</small>' +
                    '        <p>' + data["time"] + ' second(s)</p>' +
                    '        <small class="text-muted">DATE SCANNED</small>' +
                    '        <p>' + data["date"] + '</p>' +
                    '        <div class="pb-1">' +
                    '            <a href="history.html" class="btn btn-sm btn-primary"><i class="fas fa-history fa-fw fa-sm"></i> View History</a>' +
                    '            <a href="upload.html?id=' + data["id"] + '" class="btn btn-sm btn-outline-secondary"><i class="fas fa-upload fa-fw fa-sm"></i> Update Code</a>' +
                    '        </div>'
                );

                if (
                    Array.isArray(data['history']) &&
                    data !== null
                ) {
                    for (var i = 0; i < data['history'].length; i++) {
                        history.push(parseInt(data['history'][i]['ad_total_error']));
                    }

                    var myConfig = {
                        "type": "line",
                        title: {
                            "text": "Last 10 Analyzed Result Comparison",
                            "font-size": "15px"
                        },
                        backgroundColor: 'none',
                        plotarea: {
                            backgroundColor: 'transparent'
                        },
                        "scale-y": {
                            "line-color": "#f6f7f8",
                            "guide": {
                                "line-style": "dashed"
                            },
                            "label": {
                                "text": "Warning(s) Detected",
                            },
                            "minor-ticks": 0,
                            "thousands-separator": ","
                        },
                        "scale-x": {
                            "min-value": 1,
                            "max-value": 10,
                            "label": {
                                "text": "Uploaded Source Code",
                            },
                        },
                        "series": [{
                            "values": history
                        }]
                    };

                    zingchart.render({
                        id: 'myChart',
                        data: myConfig,
                        height: "100%",
                        width: "100%"
                    });

                } else {
                    $('#display-container').append(
                        '<div class="row">' +
                        '<div class="col-auto text-center m-auto py-3">' +
                        '<p>No file history available.</p>' +
                        '</div>' +
                        '</div>'
                    );
                }

                for (var x = 0; x < data.data.length; x++) {
                    $('#display-container').append(
                        '<div class="row pb-2">' +
                        '    <div class="col">' +
                        '        <div class="card rounded-3 shadow-sm h-100">' +
                        '            <div class="card-header bg-warning ">' +
                        '                <p class="mb-0 fw-normal" style=" letter-spacing: 1px;" >' +
                        '                    <i class="fas fa-exclamation-triangle fa-fw fa-sm me-1"></i>' +
                        '                    SQL INJECTION WARNING!' +
                        '                </p>' +
                        '            </div>' +
                        '            <div class="card-body d-inline-flex">' +
                        '                <div class="pe-3 border-end">' +
                        '                    <small class="text-muted">LINE</small>' +
                        '                    <p class="mb-0">' + data.data[x]['line'] + '</p>' +
                        '                </div>' +
                        '                <div class="ps-3">' +
                        '                    <small class="text-muted">CODE</small>' +
                        '                    <p class="mb-0">' + data.data[x]['content'] + '</p>' +
                        '                </div>' +
                        '            </div>' +
                        '            <div class="card-footer">' +
                        '                <small class="text-muted">DESCRIPTION</small>' +
                        '                <p class="mb-0">' + data.data[x]['desc'] + '</p>' +
                        '            </div>' +
                        '            <div class="card-footer">' +
                        '                <small class="text-muted">EXAMPLE CODE FIX</small>' +
                        '                <p class="mb-0">' + data.data[x]['code'] + '</p>' +
                        '            </div>' +
                        '        </div>' +
                        '    </div>' +
                        '</div>'
                    );
                }

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