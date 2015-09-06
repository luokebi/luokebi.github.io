var testName = window.location.search.match(/list_name=(.*)&/)[1];
var testDisplayName = decodeURIComponent(window.location.search.match(/display_name=(.*)$/)[1]);

$('title').text(testDisplayName);

$('#currentPage').text(testDisplayName);

function getTemplate(id) {
    return $("#" + id).html();
}

var SINGLE = getTemplate('single-topic-template');
//console.log(SINGLE);
var MULTIPLE = getTemplate('multiple-topic-template');
var SINGLE2 = getTemplate('single2-topic-template');


function switchTopic(index) {
    console.log(index);
    $('.topic-item').hide();
    $('.topic-item[data-index="' + index + '"]').fadeIn();
}

function buildTests(data) {
    var tests = data.topics;

    var length = tests.length;
    console.log(length);

    for (var i = 0, n = tests.length; i < n; i++) {
        var type = tests[i].type;

        if (type == 'single') {
            if (!tests[i].D) {
                var item = $(tmpl(SINGLE, {
                    content: tests[i].content,
                    a: tests[i].A,
                    b: tests[i].B,
                    c: tests[i].C,
                    answer: tests[i].answer,
                    index: i + ""
                }));
            } else {
                var item = $(tmpl(SINGLE, {
                    content: tests[i].content,
                    a: tests[i].A,
                    b: tests[i].B,
                    c: tests[i].C,
                    d: tests[i].D,
                    answer: tests[i].answer,
                    index: i + ""
                }));
            }

            if (!tests[i].D) {
                item.find('.list-group-item[data-value="D"]').remove();
            }


            item.attr('data-answer', tests[i].answer);


            item.find('.list-group-item').on('click', function() {
                $(this).siblings().removeClass('active').end().addClass('active');
            });

            item.find('.test-answer').on('click', function(e) {
                e.preventDefault();
                var _answer = $(this).parents('.topic-item').find('.list-group-item.active').attr('data-value');
                var answer = $(this).parents('.topic-item').attr('data-answer');
                console.log(_answer);
                if (!_answer) {
                    alert("请选择答案！")
                    return;
                }
                if (_answer == answer) {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('right').addClass('wrong');
                }
            });

            item.find('.next-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) + 1;
                switchTopic(index);
            });

            item.find('.prev-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) - 1;
                switchTopic(index);
            });


        } else if (type == 'multiple') {

            var item = $(tmpl(MULTIPLE, {
                content: tests[i].content,
                a: tests[i].A,
                b: tests[i].B,
                c: tests[i].C,
                d: tests[i].D,
                answer: tests[i].answer,
                index: i + ""
            }));
            if (tests[i].E) {
                item.find('.list-group').append('<li class="list-group-item" data-value="E">E. ' + tests[i].E + '</li>');
            }

            if (tests[i].F) {
                item.find('.list-group').append('<li class="list-group-item" data-value="F">F. ' + tests[i].F + '</li>');
            }

            item.attr('data-answer', tests[i].answer);


            item.find('.list-group-item').on('click', function() {
                $(this).toggleClass('active');
            });

            item.find('.test-answer').on('click', function(e) {
                e.preventDefault();
                var _answers = [];

                $(this).parents('.topic-item').find('.list-group-item.active').each(function() {
                    _answers.push($(this).attr('data-value'));
                });

                var _answer = _answers.join('').trim();
                var answer = $(this).parents('.topic-item').attr('data-answer');
                if (!_answer) {
                    alert("请选择答案！")
                    return;
                }
                if (_answer == answer) {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('right').addClass('wrong');
                }
            });

            item.find('.next-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) + 1;
                switchTopic(index);
            });

            item.find('.prev-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) - 1;
                switchTopic(index);
            });

        } else if (type == 'single2') {
            var item = $(tmpl(SINGLE2, {
                content: tests[i].content,
                answer: tests[i].answer,
                index: i + ""
            }));

            item.attr('data-answer', tests[i].answer);


            item.find('.list-group-item').on('click', function() {
                $(this).siblings().removeClass('active').end().addClass('active');
            });

            item.find('.test-answer').on('click', function(e) {
                e.preventDefault();
                var _answer = $(this).parents('.topic-item').find('.list-group-item.active').attr('data-value');
                var answer = $(this).parents('.topic-item').attr('data-answer');
                if (!_answer) {
                    alert("请选择答案！")
                    return;
                }
                if (_answer == answer) {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.answer-action').removeClass('right').addClass('wrong');
                }
            });

            item.find('.next-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) + 1;
                switchTopic(index);
            });

            item.find('.prev-topic').on('click', function(e) {
                e.preventDefault();
                var index = parseInt($(this).parents('.topic-item').attr('data-index')) - 1;
                switchTopic(index);
            });
        } else {

        }

        if (i == 0) {
            item.find('.prev-topic').hide();
        } else if (i == length - 1) {
            item.find('.next-topic').hide();
        }

        //console.log(item);
        if (item) {
            $('#topic-container').append(item);
        }
    }

    $('.topic-item[data-index="0"]').show();
}

requestSource('./tests/' + testName + '.json', buildTests);
