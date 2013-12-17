// Wait for Phonegap to load
document.addEventListener("deviceready", onDeviceReady, false);

var postList;
var postContent = new Array();
var postTitle = new Array();
var idPost = 0;						// <goret>global variable</goret> 


function onDeviceReady()
{
	$("#loginForm").on("submit", handleLogin);
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
					$.mobile.changePage('#dashboard', { transition: 'pop' }); // change to inner page #dashboard
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

$(document).on('pageinit', '#dashboard', function() // initialize dashboard
{
	if (typeof window.postList === 'undefined') // dont initialize the dashboard a second time
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
					navigator.notification.alert(data.response); // debug alert with all the json
					window.postList = data.response;
					var html = '<ul data-role="listview" data-filter="true">'; 
					for (var i = 0; i < 20; i++) // display 20 posts
					{
						var entry = window.postList[i];
						html += '<li id="' + entry.post_title + '">';
						html += '<a href="#post" data-transition="slide" onclick="window.idPost = '+ i +'">';
						html += '<div class="entry"><h2>' + entry.post_title + '</h2></div>' ;
						html += '<div class="entry"><p>' + 'Date : ' + entry.post_date + '</p></div>' ;
						html += '<div class="entry"><p><strong>' + 'Type : <span color=#FFFFFF backgroundColor=#' + get_color_type(entry.post_type) + '>' + capFLetter(entry.post_type) + '</span></p></strong></div>'; // get_color_type() does not work yet
						html += '<div class="entry"><p>' + 'Comments : ' + entry.comment_count + '</p></div>';
						html += '</a>';
						html += '</li>';
						handlepost(i); // put the posts content inside a var
					}
					html += '</ul>';
					$( "#postlist" ).append(html); // append the whole html 
					$( "#postlist ul[data-role=listview]" ).listview();
				}		
				else
				{
					navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
				}
			}
		});
	}
});

$(document).on('pagebeforeshow', '#post', function() // page post display the right post
{
	$( "#headpost" ).empty();		// clear the title page from the previous post
	$( "#myPost" ).empty();			// clear the content from the previous post
	$( "#headpost" ).append(window.postTitle[window.idPost]);	//  new title
	$( "#myPost" ).append(window.postContent[window.idPost]); //	new content already formated in array
	$( "#myPost ul[data-role=listview]" ).listview();
});

