function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function deviceReady() 
{
	$("#loginForm").on("submit",function(e) {
	$("#submitButton",this).attr("disabled","disabled");
	var u = $("#username", this).val();
	var p = $("#password", this).val();
	if (u != '' && p!= '')
	{
		$.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", { username:u,password:p}, function(res) {
			if(res == true)
			{
				$.mobile.changePage("thefuturishere.html");
			}
			else
			{
				navigator.notification.alert("res = " + res);
				navigator.notification.alert("Your login failed", function() {});
			}
			$("#submitButton").removeAttr("disabled");
		},"json");
	}
	return false;
	});			// remember to change the code later...
}