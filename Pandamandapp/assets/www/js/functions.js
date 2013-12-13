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

function displaypost(idPost)
{
	$( "#headpost" ).empty();		// clear the title page from the previous post
	$( "#myPost" ).empty();			// clear the content from the previous post
	$( "#headpost" ).append(window.postTitle[idPost]);	//  new title
	$( "#myPost" ).append(window.postContent[idPost]); //	new content already formated in array
	$( "#myPost ul[data-role=listview]" ).listview();
}

function formatpost(myPostContent)
{
	var contentArr = new Array(),
		arrLength = 0,
		html = '<ul data-role="listview" data-filter="false">',
		contentArrInside = new Array();

	contentArr = myPostContent.split("\r");
	arrLength = contentArr.length;
	
	for (var i = 0; i < arrLength; i++)
	{
		contentArrInside = contentArr[i].split("|");
		html += '<li>';
		html += '<a href="#dashboard" data-rel="back">';
		html += '<div class="entry"><h2>' + contentArrInside[1] + '</h2></div>' ;
		html += '<div class="entry"><p>' + contentArrInside[0] + '</p></div>' ;
		html += '<div class="entry"><p><strong>' + contentArrInside[2] + '</strong></p></div>';
		html += '</a>';
		html += '</li>';
	}
	html += '</ul>';
	return (html);
}

function handlepost(idPost)
{
	var myPost;
		
	myPost = window.postList[idPost];
	window.postTitle[idPost] = myPost.post_title;
	
	window.postContent[idPost] = formatpost(myPost.post_content);
	if (typeof postContent[idPost] === 'undefined')
	{
		return false;
	}
	return true;
}