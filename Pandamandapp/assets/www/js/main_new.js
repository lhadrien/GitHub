// Wait for Phonegap to load
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
	$("#loginForm").on("submit", handleLogin);
}

function capFLetter(string)
{ // function to capitalize the first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function get_color_type(data_type)
{ // function to get a background color for the type of the post
	var color = '';
	
	switch (data_type)
	{
	case "flashcard":
		color = "FFAD5C";
		break;
	case "survival":
		color = "47B224";
		break;
	case "lesson":
		color = "1996E8";
		break;
	case "new":
		color = "D63333";
		break;
	default:
		color = "C49BFF";
		break;
	return (color);
	};
}

function handleLogin() // function that login
{
	var form = $("#loginForm");

	$("#submitButton",form).attr("disabled","disabled"); // disable the buttons while we login, so we won't send 2 requests
	var user = $("#username", form).val(); // get the form data inside vars
	var pass = $("#password", form).val();
	
	if (user != '' && pass != '') // condition if the form isn't blank
	{
		$.ajax({ // ajax request with jQuery to the webside
			type: 'POST',
			dataType: 'json',
			crossDomain: true,
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
					window.localStorage["username"] = user;
					window.localStorage["password"] = pass;
					$.mobile.changePage('#dashboard', { transition: 'pop' });
					displayjson_dashboard();
					 // document.location.href = "main_page_dashboard.html"; // charge the next page old way
				}
				else
				{
					navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
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

function displayjson_dashboard()
{
	$.ajax({
		type: "POST",
		crossDomain: true,
		url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
		dataType: 'json',
		data: { 
				'action': 'dashboard_app'
			},
		error: function() {
			navigator.notification.alert('Unable to load feed, Incorrect path or invalid feed');
		},
		success: function(data) {
			if (data.dashboard == true)
			{
				navigator.notification.alert('Message', function() {}, data.message, 'Ok !');
				var postlist = data.response;
				var html = '<ul data-role="listview" data-filter="true">' ;
//				window.localStorage["json_posts"] = postlist;
//				window.localStorage["post_title"] = entry.post_title;
				for (var i = 0; i < 20; i++)
				{

					var entry = postlist[i];
					html += '<li id="toPost">';
					html += '<a href="#post" data-transition="slide">';
					html += '<div class="entry"><h2>' + entry.post_title + '</h2></div>' ;
					html += '<div class="entry"><p>' + 'Date : ' + entry.post_date + '</p></div>' ;
					html += '<div class="entry"><p><strong>' + 'Type : <span color=#FFFFFF backgroundColor=#' + get_color_type(entry.post_type) + '>' + capFLetter(entry.post_type) + '</span></p></strong></div>';
					html += '<div class="entry"><p>' + 'Comments : ' + entry.comment_count + '</p></div>';
					html += '</a>';
					html += '</li>';
				}
				html += '</ul>';
				$( "#postlist" ).append(html);
				$( "#postlist ul[data-role=listview]" ).listview();
			}		
			else
			{
				navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
			}
		}
	});

}

function handlepost()
{
	var html = "hello im the post, test";
	$( "#myPost" ).append(html);
}

$( "#toPost" ).click(function() {
	handlepost();
});