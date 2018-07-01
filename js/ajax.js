function login()
{
	var data = $("#UserAddForm").serialize();

	/* Or no serialization (Read #2 below)
	var username = $("#UserUsername").val();
	var password = $("#UserPassword").val();
	var data = "username="+ username +"&password="+ password;
	*/

	$.ajax({
		type: "post",		// Request method: post, get
		url: "checkAnswers",	// URL to request
		data: data,		// Form variables
		dataType: "html",	// Expected response type
		success: function(response, status) {
			// Will continue in part 3
                        alert(response);
		},
		error: function(response, status) {
			alert(response);
		}
	});

	return false;
}