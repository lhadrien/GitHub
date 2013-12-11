function init() { // a phonegap function that check if the device is ready
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
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
				for (var i = 0; i < 10; i++)
				{ 
					var entry = postlist[i];
					html += '<li>';
					html += '<a href="' + entry.guid + '">';
					html += '<div class="entry">' + 'Title : ' + entry.post_title + '</div>' ;
					html += '<div class="entry">' + 'Date : ' + entry.post_date + '</div>' ;
					html += '<div class="entry">' + 'Type : <span color=#FFFFFF backgroundColor=#' + get_color_type(entry.post_type) + '>' + capFLetter(entry.post_type) + '</span></div>';
					html += '<div class="entry">' + 'Comments : ' + entry.comment_count + '</div>';
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
/*			$( "#postlist" ).append(html);
			$( "#postlist ul[data-role=listview]" ).listview(); */
		}
	});

}