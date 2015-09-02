var testName = window.location.search.match(/list_name=(.*)$/)[1];

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

    for (var i = 0, n = tests.length; i < n; i++) {
        var type = tests[i].type;

        if (type == 'single') {
            var item = $(tmpl(SINGLE, {
                content: tests[i].content,
                a: tests[i].A,
                b: tests[i].B,
                c: tests[i].C,
                d: tests[i].D,
                anwser: tests[i].anwser,
                index: i + ""
            }));

            item.attr('data-anwser', tests[i].anwser);


            item.find('.list-group-item').on('click', function() {
                $(this).siblings().removeClass('active').end().addClass('active');
            });

            item.find('.test-anwser').on('click', function(e) {
                e.preventDefault();
                var _anwser = $(this).parents('.topic-item').find('.list-group-item.active').attr('data-value');
                var anwser = $(this).parents('.topic-item').attr('data-anwser');
                console.log(_anwser, anwser);
                if (_anwser == anwser) {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('right').addClass('wrong');
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
                anwser: tests[i].anwser,
                index: i + ""
            }));

            item.attr('data-anwser', tests[i].anwser);


            item.find('.list-group-item').on('click', function() {
                $(this).toggleClass('active');
            });

            item.find('.test-anwser').on('click', function(e) {
                e.preventDefault();
                var _anwsers = [];

                $(this).parents('.topic-item').find('.list-group-item.active').each(function() {
                	_anwsers.push($(this).attr('data-value'));
                });

                var _anwser = _anwsers.join('').trim();
                var anwser = $(this).parents('.topic-item').attr('data-anwser');
                console.log(_anwser, anwser);
                if (_anwser == anwser) {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('right').addClass('wrong');
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
                anwser: tests[i].anwser,
                index: i + ""
            }));

            item.attr('data-anwser', tests[i].anwser);


            item.find('.list-group-item').on('click', function() {
                $(this).siblings().removeClass('active').end().addClass('active');
            });

            item.find('.test-anwser').on('click', function(e) {
                e.preventDefault();
                var _anwser = $(this).parents('.topic-item').find('.list-group-item.active').attr('data-value');
                var anwser = $(this).parents('.topic-item').attr('data-anwser');
                console.log(_anwser, anwser);
                if (_anwser == anwser) {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('wrong').addClass('right');

                } else {
                    $(this).parents('.topic-item').find('.anwser-action').removeClass('right').addClass('wrong');
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

        console.log(item);
        if (item) {
            $('#topic-container').append(item);
        }
    }

    $('.topic-item[data-index="0"]').show();
}

requestSource('./tests/' + testName + '.json', buildTests);
