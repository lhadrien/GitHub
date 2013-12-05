function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}


function checkPreAuth() {
	var form = $("#loginForm");

	if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined)
	{
		$("#username", form).val(window.localStorage["username"]);
		$("#password", form).val(window.localStorage["password"]);
		handleLogin();
	}
}

function handleLogin() 
{
	var form = $("#loginForm");    

	$("#submitButton",form).attr("disabled","disabled");
	var user = $("#username", form).val();
	var pass = $("#password", form).val();
	
	console.log("click.. then...");
	if (user != '' && pass != '')
	{
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
			username: user,
			password: pass,
			data: { 
				'action': 'login_app',
				'username': user, 
				'password': pass },
			success: function(data){
				if (data.loggedin == true)
				{
					navigator.notification.alert(data.message, function() {});
					window.localStorage["username"] = user;
					window.localStorage["password"] = pass;
					$.mobile.changePage("thefuturishere.html");
				}
				else
				{
					navigator.notification.alert(data.message, function() {}, 'Login failed', 'Ok...');
				}
				$("#submitButton").removeAttr("disabled");
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