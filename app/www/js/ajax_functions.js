function ajax_login(user, pass)
{
	$.ajax({ // ajax request with jQuery to the webside
		type: 'POST',
		dataType: 'json',
		crossDomain: true,
		url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
		username: user,
		password: pass,
		data: { 
			action: 'login_app',
			username: user, 
			password: pass
		},
		error: function() {
			console.log('function login error: -> error ajax');
			navigator.notification.alert('Unable to load feed, Incorrect path or invalid feed');
		},
		success: function(data) { // if success then do...
			console.log('function login success: -> success ajax and data.loggedin = ' + data.loggedin);
			if (data.loggedin == true) {
				window.localStorage["username"] = user;
				window.localStorage["password"] = pass;
				console.log('function login success: -> loggedin = true and we change page now');
				$.mobile.changePage('#dashboard', { transition: 'pop', changeHash: false });
				$("#submitButton").removeAttr("disabled"); // enable again the buttons
				return true;
			} else {
				console.log('function login: -> success ajax but loggedin == false');
				navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
				$("#submitButton").removeAttr("disabled"); // enable again the buttons
				return false;
			}
		}
	});
}

function ajax_dashboard()
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