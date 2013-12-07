$(document).ready(function() {
	url = 'http://hopexxx.com/category/daily-devotion/feed/';
	$.ajax({
		type: "GET",
		url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		error: function() {
			alert('Unable to load feed, Incorrect path or invalid feed');
		},
		success: function(data) {
			var postlist = data.responseData.feed.entries;
			var html = '<ul data-role="listview" data-filter="true">' ;
			for (var i = 0; i < 10; i++)
			{
				var entry = postlist[i];
				html += '<li>';
				html += '<a href="#">';
				html += '<div class="entry">' + entry.title + '</div>' ;
				html += '<div class="entry">' + entry.author + '</div>' ;
				html += '<div class="entry">' + entry.publishedDate + '</div>';
				html += '<div class="entry">' + entry.contentSnippet + '</div>';
				html += '</a>';
				html += '</li>';
			}
			html += '</ul>';
			$( "#postlist" ).append(html);
			$( "#postlist ul[data-role=listview]" ).listview();
		}
	});
});