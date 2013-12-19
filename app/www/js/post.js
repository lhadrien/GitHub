/**
 * Post
 */
var post = {

	idPost: 0,
	postContents: new Array(),
	postTitles: new Array(),
	lessonsText: new Array(),
	lessonsVocab: new Array(),
	lessonsExercice: new Array(),
	lessonsGrammar: new Array(),
	
	myTest: function (e) {
		console.log($(e).data("post"));
		alert($(e).data("post"));
	},
	
	display: function (idPost) {
		console.log('function post: disp: idPost = ' + idPost);
		if (typeof idPost !== 'undefined')
		{
			$( "#myPost  ul[data-role=listview]" ).listview();
			$( "#headpost" ).empty();		// clear the title page from the previous post
			$( "#myPost" ).empty();			// clear the content from the previous post
			$( "#lessonNavBar" ).empty();	// clear the previous navbar for lesson
			console.log('function post: disp: empty done');
			$( "#headpost" ).append(post.postTitles[idPost]);			//  new title
			if (dashboard.postList[idPost].post_type == 'lesson') {
				console.log('function post: display: my super post is a lesson');
				post.addnavbar();
				post.addlesson(idPost);
			} else {
				$( "#myPost" ).append(post.postContents[idPost]); //	new content already formated in array
			}
//		$( "#myPost  ul[data-role=listview]" ).listview().listview('refresh');
			post.idPost = idPost;
		}
		console.log('function post: disp: -> Im outside the IF, end');
		$.mobile.changePage( $('#post'), { transition: 'slide', changeHash: false });
		return false;
	},

	formatpost: function (myPostContent) {
		var contentArr = new Array(),
			arrLength = 0,
			html = '<ul id="post" data-role="listview" data-filter="false">',
			contentArrInside = new Array();

		contentArr = myPostContent.split("\r");
		arrLength = contentArr.length;
		
		for (var i = 0; i < arrLength; i++) {
			contentArrInside = contentArr[i].split("|");
			html += '<li>';
			html += '<a href="#" class="playSound" data-sound="' + contentArrInside[1] + '">';
			html += '<div class="entry"><h2>' + contentArrInside[1] + '</h2></div>' ;
			html += '<div class="entry"><p>' + contentArrInside[0] + '</p></div>' ;
			html += '<div class="entry"><p><strong>' + contentArrInside[2] + '</strong></p></div>';
			html += '</a>';
			html += '</li>';
		}
		html += '</ul>';
		return (html);
	},

	playsound: function(textSound) {
	    var audioElement = document.createElement('audio'),
			linkSound = "http://api.voicerss.org/?key=7f4987b0d4ce417d9404c58c4fb07ca8&src=" + textSound + "&hl=zh-cn&f=12khz_16bit_stereo&r=-5&ext=.mp3";
			console.log('linksound = ' + linkSound);
        audioElement.setAttribute('src', linkSound);
        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.play();
		},

	handlepost: function (idPost) {
		var myPost,
			myLesson;

		myPost = dashboard.postList[idPost];
		if (myPost.post_type === 'lesson') {
			post.formatlesson(myPost.ID, idPost);
		} else {
			post.postContents[idPost] = post.formatpost(myPost.post_content);
			post.postTitles[idPost] = myPost.post_title;
		}
		if (typeof post.postContents[idPost] === 'undefined')
		{
			return false;
		}
		return true;
	},

	findID: function (myArray, myId, lesson) {
		var nbElem = myArray.length;
		var myNewArray = new Array();
		var elem = '';
		
		if (lesson == true) {
			elem = 'lesson_id';
		} else {
			elem = 'grammar_id';
		}
	
		for (var i = 0, nbElemId = 0; i < nbElem; i++) {
			if (myArray[i][elem] == myId) {
				myNewArray[nbElemId] = myArray[i];
				nbElemId++;
			}
		}
		return (myNewArray);
	},
	
	formatlesson: function (myId, idPost) {
		var myText,
			myExercice,
			myGrammar,
			myVocab;
		
		myText = post.findID(dashboard.lessonsText, myId, true);
//		myExercice = post.findID(dashboard.lessonsExercice, myId, true);
		myGrammar = post.findID(dashboard.lessonsGrammar, myId, true);
		myVocab = post.findID(dashboard.lessonsVocab, myId, true);
		
		if (typeof myText === 'undefined') {
			console.log('error myText has not the good ID');
		}
/*		if (myExercice === -1) {
			console.log('error myExercice has not the good ID');
		} */
		if (myGrammar === -1) {
			console.log('error myGrammar has not the good ID');
		}
		if (myVocab === -1) {
			console.log('error myVocab has not the good ID');
		}
	
		post.lessonsText[idPost] = post.formatTextnVocab(myText);
//		post.lessonsExercice[idPost] = post.formatExercice(myExercice);
		post.lessonsGrammar[idPost] = post.formatGrammar(myGrammar);
		post.lessonsVocab[idPost] = post.formatTextnVocab(myVocab);
		
	},
	
	formatTextnVocab: function (myText) {
		
		var lovelyhtml = '',
			arrLength = 0;

		arrLength = myText.length;
		lovelyhtml = '<ul id="post" data-role="listview" data-filter="false">';
		
		for (var i = 0; i < arrLength; i++) {

			lovelyhtml += '<li>';
			lovelyhtml += '<a href="#" class="playSound" data-sound="' + myText[i].chinese + '">';
			if (typeof myText[i].text_person === 'undefined') {
				lovelyhtml += '<div></div>';
			} else {
				lovelyhtml += '<div>' + myText[i].text_person + '</div>';
			}
			lovelyhtml += '<div class="entry"><h2>' + myText[i].chinese + '</h2></div>' ;
			lovelyhtml += '<div class="entry"><p>' + myText[i].pinyin + '</p></div>' ;
			lovelyhtml += '<div class="entry"><p><strong>' + myText[i].english + '</strong></p></div>';
			lovelyhtml += '</a>';
			lovelyhtml += '</li>';
		}
		lovelyhtml += '</ul>';
		return (lovelyhtml);
		
	},
/*	
	formatExercice: function (myExercice) {
	
	},
*/	
	formatGrammar: function (myGrammar) {
	
		var lovelyGrammar = '',
			gramIdsLength = 0,
			gramByIdLength = 0;
			gramIds = new Array(),
			myGrammarById = new Array();

		gramIds = post.getgramIds(myGrammar); // Get all the different ID for the grammar
		gramIdsLength = gramIds.length;
		
		for (var i = 0; i < gramIdsLength; i++) {

			myGrammarById = post.findID(myGrammar, gramIds[i], false); // find all the grammar with the same ID, "false" because "true" is already for the lessons
			gramByIdLength = myGrammarById.length;
			
			lovelyGrammar += '<div data-role="collapsible" data-collapsed="false" data-theme="a" data-content-theme="c"><h3>';
			lovelyGrammar += myGrammarById[0].grammar_text; // display the title of the grammar ID
//			console.log('function formatGrammar: the title is : ' + myGrammarById[0].grammar_text);
			lovelyGrammar += '</h3><ul data-role="listview" data-filter="false">';
			
			for (var j = 0; j < gramByIdLength; j++) {

				lovelyGrammar += '<li>';
				lovelyGrammar += '<a href="#" class="playSound" data-sound="' + myGrammarById[j].chinese + '">';
				lovelyGrammar += '<div class="entry"><h2>' + myGrammar[j].chinese + '</h2></div>' ;
				lovelyGrammar += '<div class="entry"><p>' + myGrammarById[j].pinyin + '</p></div>' ;
				lovelyGrammar += '<div class="entry"><p><strong>' + myGrammarById[j].english + '</strong></p></div>';
				lovelyGrammar += '</a>';
				lovelyGrammar += '</li>';
			}
			lovelyGrammar += '</ul></div>';
		}
		
		return (lovelyGrammar);
	
	},
	
	getgramIds: function (myGrammar) {
		
		var gramIds = new Array(),
			gramId = 0;
		
		for (i = 0; i < myGrammar.length; i++) {
		
			gramId = myGrammar[i].grammar_id;
			if (gramIds.indexOf(gramId) == -1) {
				gramIds.push(gramId);
			}
		}
		return (gramIds);
	},
	
	addnavbar: function (postTitle) {
		var navbar = '';
	
		navbar = '<div data-role="navbar"><ul>';
		navbar += '<li><a href="#myText" data-tab-class="tab1" class="ui-btn-active">Dialogues</a></li>';
		navbar += '<li><a href="#myVocab" data-tab-class="tab2" >Vocabulary</a></li>';
		navbar += '<li><a href="#myGrammar" data-tab-class="tab3">Grammar</a></li>';
		navbar += '<li><a href="#myExercice" data-tab-class="tab4">Exercice</a></li>';
		navbar += '</ul></div>';
		navbar = $(navbar).appendTo('#lessonNavBar2');
		$( "#lessonNavBar" ).append(navbar).trigger('create');;
		console.log('function post: addnavbar: navbar added');
	},
	
	addlesson: function (idPost) {
		var lovelyLesson = '';
		
		console.log('function post: addlesson: start with idPost : ' + idPost);
		lovelyLesson = '<div id="myText" class="tab-content"><div class="tab1">';
		lovelyLesson += post.lessonsText[idPost];
		lovelyLesson += '</div><div id="myVocab" class="tab2 ui-screen-hidden">';
		lovelyLesson += post.lessonsVocab[idPost];
		lovelyLesson += '</div><div id="myGrammar" class="tab3 ui-screen-hidden">';
		lovelyLesson += post.lessonsGrammar[idPost];
		lovelyLesson += '</div><div id="myExercice" class="tab4 ui-screen-hidden">';
		lovelyLesson += 'My Exercice Soon, seriously';
//		lovelyLesson += post.lessonsExercice[idPost];
		lovelyLesson += '</div></div>';
		
		$( "#myPost" ).append(lovelyLesson);
	}

};