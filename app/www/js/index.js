/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		console.log('app.bindEvents !');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        @todo: JS error in console

        var parentElement = document.getElementById(id);
        
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
       
        switch (id) {
            case 'deviceready':
				console.log('device ready : success');
                $('#loginForm').on('submit', login.process);
				$(document).on('pageinit', '#dashboard', dashboard.display);
				$('body').on('click', 'a.showDash', function() {
					console.log('click on post number : ' + $(this).data("post"));
					post.display($(this).data("post"));
				});
				$('body').on('click', 'a.playSound', function() {
					console.log('click on sound : ' + $(this).data("sound"));
					
					post.playsound($(this).data("sound"));
				});
				break;
        }
    }
};

/**
 * Login
 */
var login = {

	_login: null,

	process: function(e) {
		console.log('function login: process: -> start');
		e.preventDefault(); // Prevent the form from submitting
		var form = $("#loginForm");

		$("#submitButton", form).attr("disabled","disabled"); // disable the buttons while we login, so we won't send 2 requests
		var user = $("#username", form).val(); // get the form data inside vars
		var pass = $("#password", form).val();

		if (user != '' && pass != '') {
			login.ajax(user, pass)
			return false;
		}
		else
		{
			console.log('function login: process: -> you must enter a username and a password, fail');
			navigator.notification.alert("You must enter a username and a password", function() {});
			$("#submitButton").removeAttr("disabled");
		}
		console.log('function login: process: -> end');
		return false;
	},
	
	ajax: function(user, pass) {
		console.log('function login: ajax: -> start');
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
				console.log('function login: ajax: error: -> error ajax');
				navigator.notification.alert('Unable to load feed, Incorrect path or invalid feed');
			},
			success: function(data) { // if success then do...
				console.log('function login: ajax: success: -> success ajax and data.loggedin = ' + data.loggedin);
				if (data.loggedin == true) {
					window.localStorage["username"] = user;
					window.localStorage["password"] = pass;
					console.log('function login: ajax: success: -> loggedin = true and we change page now');
					$.mobile.changePage( $('#dashboard'), { transition: 'pop', changeHash: false });
					$("#submitButton").removeAttr("disabled"); // enable again the buttons
					return true;
				} else {
					console.log('function login: ajax: -> success ajax but loggedin == false');
					navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
					$("#submitButton").removeAttr("disabled"); // enable again the buttons
					return false;
				}
			}
		});
	}
		
};

/**
 * Dashboard
 */
var dashboard = {

	postList: null,
	lessonsText: null,
	lessonsGrammar: null,
	lessonsVocabs: null,
	lessonsExercice: null,

	display: function(e) {
		console.log('function dashboard: -> start');
		if (login._login == null) {
			console.log('function dashboard: disp: _login is : ' + login._login);
			dashboard.ajax();
			return false;
		} else {
			console.log('function dashboard: disp: _login is : ' + login._login);
			return false;
		}
	},
	
	ajax: function(e) {
		console.log('function dashboard: ajax: -> start');
		$.ajax({
			type: "POST",
			crossDomain: true,
			url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
			dataType: 'json',
			data: { 
					'action': 'dashboard_app'
				},
			error: function() {
				console.log('function dashboard: ajax: error: fail');
				navigator.notification.alert('Unable to load feed, Incorrect path or invalid feed');
			},
			success: function(data) {
				console.log('function dashboard: ajax: success: ' + data.got_dashboard);
				if (data.got_dashboard == true)
				{
					dashboard.postList = data.dashboard;
					dashboard.lessonsText = data.dialogues;
					dashboard.lessonsGrammar = data.grammar;
					dashboard.lessonsVocabs = data.vocabs;
					dashboard.lessonsExercice = data.exercices;
					var html = '<ul id="dash" data-role="listview" data-filter="true">'; 
					for (var i = 0; i < 20; i++) // display 20 posts
					{
						var entry = dashboard.postList[i];
						html += '<li>';
						html += '<a href="#" class="showDash" data-post="' + i + '" data-transition="slide">';
						html += '<div class="entry"><h2>' + entry.post_title + '</h2></div>' ;
						html += '<div class="entry"><p>' + 'Date : ' + entry.post_date + '</p></div>' ;
						html += '<div class="entry"><p><strong>' + 'Type : <span color=#FFFFFF backgroundColor=#' + dashboard.get_color_type(entry.post_type) + '>' + dashboard.capFLetter(entry.post_type) + '</span></p></strong></div>'; // get_color_type() does not work yet
						html += '<div class="entry"><p>' + 'Comments : ' + entry.comment_count + '</p></div>';
						html += '</a>';
						html += '</li>';
						post.handlepost(i); // put the posts content inside a var
					}
					html += '</ul>';
					$( "#postlist" ).append(html); // append the whole html 
					$( "#postlist ul[data-role=listview]" ).listview();
					return true;
				}
				else
				{
					console.log('function dashboard: ajax: success but fail');
					navigator.notification.alert("Fail", function() {}, data.message, 'Ok...');
					return false;
				}
			}
		});
	},
	
	get_color_type: function(data_type)
	{ // function to get a background color for the type of the post
		var color = '';
		
		switch (data_type) {
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
	},
	
	capFLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

};

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
			$( "#headpost" ).empty();		// clear the title page from the previous post
			$( "#myPost" ).empty();			// clear the content from the previous post
			console.log('function post: disp: empty done');
			$( "#headpost" ).append(post.postTitles[idPost]);			//  new title
//			post.addnavbar();
			$( "#myPost" ).append(post.postContents[idPost]); //	new content already formated in array
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
//		if (myPost.post_type === 'lesson') {
//			post.formatlesson(myPost.ID, idPost);
//		} else {
			post.postContents[idPost] = post.formatpost(myPost.post_content);
			post.postTitles[idPost] = myPost.post_title;
//		}
		if (typeof post.postContents[idPost] === 'undefined')
		{
			return false;
		}
		return true;
	}
/*	
	findID: function (myArray, myId) {
		var nbElem = myArray.length;
	
		for (var i = 0; i < nbElem; i++) {
			if (myArray[i].ID === myId) {
				return (myArray[i]);
			}
		}
		return (0);
	},
	
	formatlesson: function (myId, idPost) {
		var myText,
			myExercice,
			myGrammar,
			myVocab;
		
		myText = post.findID(dashboard.lessonsText, myId);
		myExercice = post.findID(dashboard.lessonsExercice, myId);
		myGrammar = post.findID(dashboard.lessonsGrammar, myId);
		myVocab = post.findID(dashboard.lessonsVocabs, myId);
		
		if (myText === -1) {
			console.log('error myText has not the good ID');
		}
		if (myExercice === -1) {
			console.log('error myExercice has not the good ID');
		}
		if (myGrammar === -1) {
			console.log('error myGrammar has not the good ID');
		}
		if (myVocab === -1) {
			console.log('error myVocab has not the good ID');
		}
		
		post.lessonsText[idPost] = post.formatpost(myText.post_content);
		post.lessonsExercice[idPost] = post.formatpost(myExercice.post_content);
		post.lessonsGrammar[idPost] = post.formatpost(myGrammar.post_content);
		post.lessonsVocab[idPost] = post.formatpost(myVocab.post_content);
		
	},
	
	addnavbar: function (postTitle) {
		var navbar = '';
	
		navbar = '<div data-role="navbar"><ul><li><a href="#">One</a></li><li><a href="#">Two</a></li><li><a href="#">Three</a></li></ul></div>';
	//	$( "#headpost" ).append(navbar);
	}
	*/
};