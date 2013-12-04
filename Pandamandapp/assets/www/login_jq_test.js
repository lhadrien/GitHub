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
	
	console.log("click");
	if (user != '' && pass != '')
	{
		$.post("http://www.pandamanda.com/pm/wp-admin/admin-ajax.php", {log:user, pwd:pass}, function(res) {
			if (res == true)
			{
				//store
				window.localStorage["username"] = user;
				window.localStorage["password"] = pass;             
				$.mobile.changePage("thefuturishere.html");
			}
			else
			{
				navigator.notification.alert("Your login failed", function() {}, 'Wrong pass or user', 'Ok, ok...');
			}
			$("#submitButton").removeAttr("disabled");
		}, "json");
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
	$("#loginForm").on("submit",handleLogin);
}