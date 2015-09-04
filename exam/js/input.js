$('#generate').on('click', function(e) {
	e.preventDefault();
	generateJson();
});

function generateJson() {
	var _content = $('#test-input').val().replace(/\n+|\r+|\s+/g,'');

	var content = _content.split(/A\./)[0];
	var A = _content.match(/A\.(.*)B\./)[1];
	var B = _content.match(/B\.(.*)C\./)[1];
	var C = _content.match(/C\.(.*)D\./)[1];
	var D = _content.match(/D\.(.*)$/)[1];

	var answer = _content.match(/[（|()]([A-D]+)[）|\)]/)[1];

	var obj = {
		type: $('#type-select').val(),
		content: content,
		A: A,
		B: B,
		C: C,
		D: D,
		answer: answer
	}

	$('#output').text(JSON.stringify(obj));

}