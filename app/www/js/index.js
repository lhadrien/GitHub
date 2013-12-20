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
	//			$.mobile.changePage( $('#dashboard'), { transition: 'pop', changeHash: false });
				console.log('device ready : success');
                $('#loginForm').on('submit', login.process);
				$(document).on('pagebeforeshow', '#dashboard', dashboard.display);
				
				$('body').on('click', 'a.showDash', function() {
					console.log('click on post number : ' + $(this).data("post"));
					post.display($(this).data("post"));
				});
				$('#loginPage').click(function(e) {
				$.mobile.changePage( $('#dashboard'), { transition: 'pop', changeHash: false });
				});
	//			$(document).on('pagebeforeshow', '#post', dashboard.display);
				
				$('body').on('click', 'a.playSound', function() {
					console.log('click on sound : ' + $(this).data("sound"));
					
					post.playsound($(this).data("sound"));
				});
				
				var prevSelection = "tab1";
/*				$('#post').on('click', '#lessonNavBar', function(e) {
					console.log('tab clicked ?');
					var newSelection = $(this).find('a').attr("id");
					console.log('prevSelection : ' + prevSelection);
					console.log('newSelection : ' + newSelection);
					$('.' + prevSelection).addClass('ui-screen-hidden');
					$('.' + newSelection).removeClass('ui-screen-hidden');
					prevSelection = newSelection;
				}); */
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

	// start to get all the data from the website before display them
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
	
	// fetch the dashboard and all the content from the website
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
					login._login = true;
					dashboard.postList = data.dashboard; // we put all the data inside vars
					dashboard.lessonsText = data.dialogues;
					dashboard.lessonsGrammar = data.grammar;
					dashboard.lessonsVocab = data.vocabs;
					dashboard.lessonsExercice = data.exercices;
					
					console.log('your lessonsVocab = ');
//					dashboard.varDump(dashboard.lessonsGrammar);

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

	// debug function to display the properties inside an array
	varDump: function (o, bool) { // bool is boolean | true for recursif | false for iteratif only
		var str='';

		for (var p in o) {
			if (typeof o[p] == 'string') {
				str += 'name : {' + p + '} = {' + o[p] + "};\n";
			} else {
				if (bool) {
					str += 'the property : {' + p + '} = { ' + dashboard.varDump(o[p], bool) + "};\n";
				} else {
					str += 'the property : {' + p + '} = { I wont go further ' + "};\n";
				}
			}
		}
		
		console.log(str);
	},
	
	// add a color to the type of post (never worked)
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
	
	// function to capitalize the first letter of the Type of post (flashcard, survival, lesson etc...)
	capFLetter: function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

};
