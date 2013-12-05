$('form#login').submit( function(e){
                    $('form#login p.status').show().text('Sending user info, please wait...');
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
                        username: $('form#login #username').val(),
                        password: $('form#login #password').val(),
                        data: { 
                            'action': 'login_app',
                            'username': $('form#login #username').val(), 
                            'password': $('form#login #password').val() },
                        success: function(data){
                            $('form#login p.status').text(data.message);
                            if (data.loggedin == true){
                                $.mobile.changePage( "/blog.html", { changeHash: false });
                            }
                        }
                    });
                    e.preventDefault();
                });