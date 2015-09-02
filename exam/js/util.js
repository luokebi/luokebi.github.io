function requestSource(url, successCallback) {
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            successCallback(data);
        },
        error: function(err) {
            alert(err);
        }
    });
}


function tmpl(template, data) {
    var str = template;
    for (i in data) {
        if (data.hasOwnProperty(i)) {
            str = str.split("#{" + i.toUpperCase() + "}").join(data[i]);
        }

    }

    return str;
}
