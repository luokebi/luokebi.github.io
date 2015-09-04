$('#parse-btn').on('click', function(e) {
	e.preventDefault();
	parseAnwser();
});

$('#output').on('click', '.anwser-item', function() {
	$(this).toggleClass('red');
});


function parseAnwser() {
	var _an = $('#anwser-input').val().split('**');

	var _s = _an[0].replace(/\s+/g,"");
	var _m = _an[1].trim().split(' ');
	var _s2 = _an[2].replace(/\s+/g,"");


	var str1 = "<p>单选题</p>";
	for (var i = 0, n = _s.length; i < n; i++) {
		var index = i+1;
		str1 = str1 +'<span class="anwser-item">' + index + '. ' + _s[i].toUpperCase() + '</span>';
	}

	console.log(str1);

	var str2 = "<p>多选题</p>";

	for (var i = 0, n = _m.length; i < n; i++) {
		var index = i+1;
		str2 = str2 + '<span class="anwser-item">' + index + '. ' + _m[i].toUpperCase() + '</span>';
	}

	console.log(str2);

	var str3 = "<p>判断题</p>";
	for (var i = 0, n = _s2.length; i < n; i++) {
		var index = i+1;
		str3 = str3 +'<span class="anwser-item">' + index + '. ' + _s2[i].toUpperCase() + '</span>';
	}


	var str = '<p class="clearfix">' + str1 + '</p>' + '<p class="clearfix">' + str2 + '</p>' + '<p class="clearfix">' + str3 + '</p>'

	$('#output').html(str);


}