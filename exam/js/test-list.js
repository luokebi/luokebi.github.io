if (window.location.search && window.location.search.match(/is_back=(.*)/)) {
    var isBack = window.location.search.match(/is_back=(.*)/)[1];
    if (isBack == 'true') {
        $('.loading-area').hide();
    }
}




$('#enter-btn').on('click', function(e) {
    e.preventDefault();
    $('.loading-area').hide();
});

var TEST_LIST_TEMPLATE = $('#test-list-template').html();

function buildTestList(data) {
    var tests = data.tests;

    for (var i = 0, n = tests.length; i < n; i++) {
        var listItem = $(tmpl(TEST_LIST_TEMPLATE, tests[i]));
        $('#test-list').append(listItem);
    }
}


requestSource('./tests.json', buildTestList);
