/**
 * Post
 */
var post = {

	idPost: 0,
	prevSelection: 'myText',
	postContents: new Array(),
	postTitles: new Array(),
	lessonsText: new Array(),
	lessonsVocab: new Array(),
	lessonsExercice: new Array(),
	lessonsGrammar: new Array(),
	
	
	// function to display the page #post
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
			if (dashboard.postList[idPost].post_type == 'lesson') { // display in a different way if its a Lesson
				console.log('function post: display: my post is a lesson');
				post.addnavbar(); // add the navbar to switch between parts
				post.addlesson(idPost); // add the content
			} else {
				$( "#myPost" ).append(post.postContents[idPost]); //	new content already formated in array
			}
//		$( "#myPost  ul[data-role=listview]" ).listview();
			post.idPost = idPost;
		}
		console.log('function post: disp: -> Im outside the IF, end');
		$.mobile.changePage( $('#post'), { transition: 'slide', changeHash: false }); // change page to #post
		$( "#myPost  ul[data-role=listview]" ).listview();
		return false;
	},

	// format the post if its not a Lesson
	formatpost: function (myPostContent) {
		var contentArr = new Array(),
			arrLength = 0,
			html = '<ul id="post" data-role="listview" data-filter="false">',
			contentArrInside = new Array();

		contentArr = myPostContent.split("\r"); // split the string when it finds "\r"
		arrLength = contentArr.length;
		
		for (var i = 0; i < arrLength; i++) { // format every part
			contentArrInside = contentArr[i].split("|"); // split the string when it finds "|"
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

	// clever function to text to speach the text inside the link
	playsound: function(textSound) {
	    var audioElement = document.createElement('audio'),
			linkSound = "http://api.voicerss.org/?key=7f4987b0d4ce417d9404c58c4fb07ca8&src=" + textSound + "&hl=zh-cn&f=12khz_16bit_stereo&r=-5&ext=.mp3";
			console.log('linksound = ' + linkSound);
        audioElement.setAttribute('src', linkSound);
        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.play();
		},

	// function to start formatting lessons 'n' all kind of post.
	handlepost: function (idPost) {
		var myPost,
			myLesson;

		myPost = dashboard.postList[idPost];
		if (myPost.post_type === 'lesson') { // if the post is a lesson, then format it with the following function
			post.formatlesson(myPost.ID, idPost);
		} else {
			post.postContents[idPost] = post.formatpost(myPost.post_content); // else we format it in a general way
			post.postTitles[idPost] = myPost.post_title;
		}
		if (typeof post.postContents[idPost] === 'undefined')
		{
			return false;
		}
		return true;
	},

	
	// function to find the content with the ID in argument (notice: this part is also used for the grammar part, cause this is the same function)
	findID: function (myArray, myId, lesson) {
		var nbElem = myArray.length;
		var myNewArray = new Array();
		var elem = '';
		
		if (lesson == true) { // true to look for the same lesson ID, false to look for the same grammar ID
			elem = 'lesson_id';
		} else {
			elem = 'grammar_id';
		}
	
		for (var i = 0, nbElemId = 0; i < nbElem; i++) { // put the content in array if same ID
			if (myArray[i][elem] == myId) {
				myNewArray[nbElemId] = myArray[i];
				nbElemId++;
			}
		}
		return (myNewArray);
	},
	
	// function to format the whole lesson
	formatlesson: function (myId, idPost) {
		var myText,
			myExercice,
			myGrammar,
			myVocab;
		
		// find all the content with the ID of the lesson, then put it in a var Object
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
	
		// Go format the content and put them inside variable
		post.lessonsText[idPost] = post.formatTextnVocab(myText);
//		post.lessonsExercice[idPost] = post.formatExercice(myExercice);
		post.lessonsGrammar[idPost] = post.formatGrammar(myGrammar);
		post.lessonsVocab[idPost] = post.formatTextnVocab(myVocab);
		
	},
	
	// function to format the Dialogue part and the Vocab part, cause it's almost the same.
	formatTextnVocab: function (myText) {
		
		var lovelyhtml = '',
			arrLength = 0;

		arrLength = myText.length;
		lovelyhtml = '<ul id="post" data-role="listview" data-filter="false">';
		
		for (var i = 0; i < arrLength; i++) {

			lovelyhtml += '<li>';
			lovelyhtml += '<a href="#" class="playSound" data-sound="' + myText[i].chinese + '">';
			if (typeof myText[i].text_person === 'undefined') { // add a <div> if there is a person who talks
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
	// function to format the Grammar part with header parts and content
	formatGrammar: function (myGrammar) {
	
		var lovelyGrammar = '',
			gramIdsLength = 0,
			gramByIdLength = 0;
			gramIds = new Array(),
			myGrammarById = new Array();

		gramIds = post.getgramIds(myGrammar); // Get all the different ID for the grammar
		gramIdsLength = gramIds.length;
		
		for (var i = 0; i < gramIdsLength; i++) { // format all the same grammar ID in one block

			myGrammarById = post.findID(myGrammar, gramIds[i], false); // find all the grammar with the same ID, "false" because "true" is already for the lessons
			gramByIdLength = myGrammarById.length;
			
			lovelyGrammar += '<div data-role="collapsible" data-collapsed="false" data-theme="b" data-content-theme="c"><h3>'; // add a header part to a list
			lovelyGrammar += myGrammarById[0].grammar_text; // display the title of the grammar ID
//			console.log('function formatGrammar: the title is : ' + myGrammarById[0].grammar_text);
			lovelyGrammar += '</h3><ul data-role="listview" data-filter="false">'; // add a list
			
			for (var j = 0; j < gramByIdLength; j++) {

				lovelyGrammar += '<li>' +
									'<a href="#" class="playSound" data-sound="' + myGrammarById[j].chinese + '">' +
										'<div class="entry"><h2>' + myGrammar[j].chinese + '</h2></div>' +
										'<div class="entry"><p>' + myGrammarById[j].pinyin + '</p></div>' +
										'<div class="entry"><p><strong>' + myGrammarById[j].english + '</strong></p></div>' +
									'</a>' +
								'</li>';
			}
			lovelyGrammar += '</ul></div>';
		}
		
		return (lovelyGrammar);
	
	},
	
	// function to get all the different ID of the grammar
	getgramIds: function (myGrammar) {
		
		var gramIds = new Array(),
			gramId = 0;
		
		for (i = 0; i < myGrammar.length; i++) { // loop to get all the different ID of the grammar lesson
		
			gramId = myGrammar[i].grammar_id;
			if (gramIds.indexOf(gramId) == -1) { // if the ID is not part of the array already, then push in array
				gramIds.push(gramId);
			}
		}
		return (gramIds);
	},
	
	addnavbar: function (postTitle) {
		var navbar = '';
	
		navbar = '<div data-role="navbar">' +
					'<ul>' +
						'<li><a href="#myText" data-tab-class="tab1" class="ui-btn-active">Dialogues</a></li>' +
						'<li><a href="#myVocab" data-tab-class="tab2">Vocabulary</a></li>' +
						'<li><a href="#myGrammar" data-tab-class="tab3">Grammar</a></li>' +
						'<li><a href="#myExercice" data-tab-class="tab4">Exercice</a></li>' +
					'</ul>' +
				'</div>';
		navbar = $(navbar).appendTo('#lessonNavBar'); // add the navbar
		$( "#lessonNavBar" ).append(navbar).trigger('create');
		console.log('function post: addnavbar: navbar added');
	},
	
	// add the lesson in #post page
	addlesson: function (idPost) {
		var lovelyLesson = '';
		
		console.log('function post: addlesson: start with idPost : ' + idPost);
		lovelyLesson = '<div><div id="myText" class="tab1">';
		lovelyLesson += post.lessonsText[idPost];  // insert the Dialogue part
		lovelyLesson += '</div><div id="myVocab" class="tab2 ui-screen-hidden">';
		lovelyLesson += post.lessonsVocab[idPost]; // insert the Vocab part
		lovelyLesson += '</div><div id="myGrammar" class="tab3 ui-screen-hidden">';
		lovelyLesson += post.lessonsGrammar[idPost]; // insert the Grammar part
		lovelyLesson += '</div><div id="myExercice" class="tab4 ui-screen-hidden">';
		lovelyLesson += 'Exercices'; // insert the Exercice part
//		lovelyLesson += post.lessonsExercice[idPost];
		lovelyLesson += '</div><div>';
		$( "#myPost" ).append(lovelyLesson); // add the content
        
        // Display right content on click on the navbar
        $('[data-role="navbar"] a').on('click', function(e) {
            // Get the DOM element click and find the href attribute of the parent
            var id = $(e.target).closest('a').attr('href').substring(1); // Remove the #
				console.log('function on click navbar: id = ' + id);
				
            // Once we get the id, we display the content
            $('#myPost')
				console.log('prevSelection : ' + post.prevSelection);
				console.log('newSelection : ' + id);
					$('#' + post.prevSelection).addClass('ui-screen-hidden');
					$('#' + id).removeClass('ui-screen-hidden');
					post.prevSelection = id;
           //     .find('div').hide().end() // Hide all divs
            //    .find('#' + id).show();   // Show selected div
        });
	}

};