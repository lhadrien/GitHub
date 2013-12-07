function init() { // a phonegap function that check if the device is ready
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}


function checkPreAuth() { // function that fill up the form with the last login
	var form = $("#loginForm");

	if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)
	{
		$("#username", form).val(window.localStorage["username"]);
		$("#password", form).val(window.localStorage["password"]);
		handleLogin();
	}
}

function handleLogin() // function that login
{
	var form = $("#loginForm");

	$("#submitButton",form).attr("disabled","disabled"); // disable the buttons while we login, so we won't send 2 requests
	var user = $("#username", form).val(); // get the form data inside vars
	var pass = $("#password", form).val();
	
	console.log("click.. then...");
	if (user != '' && pass != '') // condition if the form isn't blank
	{
		$.ajax({ // ajax request with jQuery to the webside
			type: 'POST',
			dataType: 'json',
			crossDomain: true,
			statusCode: {
				404: function() {
      				alert( 'page not found' );
    				},
    			200: function() {
    				alert( 'correctly sent' );
    				},
    			400: function() {
    				alert( 'bad request' );
    				},
    			401: function() {
    				alert( 'Unauthorized' );
    				},
    			403: function() {
    				alert( 'Forbidden' );
    				},
    			402: function() {
    				alert( 'payment required' );
    				}
				},
			url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
			username: user,
			password: pass,
			data: { 
				'action': 'login_app',
				'username': user, 
				'password': pass },
			error: function() {
				navigator.notification.alert('Unable to load feed, Incorrect path or invalid feed');
			},
			success: function(data) { // if success then do...
				if (data.loggedin == true) // wrong identification ?
				{
					navigator.notification.alert("debug loggedin == true");
					navigator.notification.alert(data.message);
					window.localStorage["username"] = user;
					window.localStorage["password"] = pass;
					$.mobile.changePage("test_json_page2.html"); // charge the next page
				}
				else
				{
					navigator.notification.alert("debug loggedin == 0 or false", function() {}, data.message, 'Ok...');
				}
				$("#submitButton").removeAttr("disabled"); // enable again the buttons
			}
		});
	}
	else
	{
		navigator.notification.alert("You must enter a username and a password", function() {});
		$("#submitButton").removeAttr("disabled");
	}
	return false;
}

function deviceReady()
{
	$("#loginForm").on("submit", handleLogin);
}