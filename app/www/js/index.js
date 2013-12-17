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
		console.log('device ready !');
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
				console.log('success, device ready');
                $('#loginForm').on('submit', login.process);
				$(document).on('pageinit', '#dashboard', dashboard.display);
            break;
        }
    }
};

/**
 * Login
 */
var login = {
	process: function(e) {
		console.log('success, process login');
		e.preventDefault(); // Prevent the form from submitting
		var form = $("#loginForm");

		$("#submitButton", form).attr("disabled","disabled"); // disable the buttons while we login, so we won't send 2 requests
		var user = $("#username", form).val(); // get the form data inside vars
		var pass = $("#password", form).val();

		if (user != '' && pass != '') {
			if (ajax_login()) {
				$.mobile.changePage('#dashboard', { transition: 'pop' });
			}
		}
		else
		{
			navigator.notification.alert("You must enter a username and a password", function() {});
			$("#submitButton").removeAttr("disabled");
		}
	}
};

var dashboard = {
	display: function(e) {
		if (typeof window.postList === 'undefined') // dont initialize the dashboard a second time
		{
			ajax_dashboard();
		}
	}
};