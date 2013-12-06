add_action( 'wp_ajax_login_app', 'login_app' );

function login_app() {
	// creation of $info with all the user information
	$info 						= array();
	$info[ 'user_login' ] 		= $_POST[ 'username' ];
	$info[ 'user_password' ]	= $_POST[ 'password' ];
	$info[ 'remember' ] 		= true;

	$user = wp_signon( $info, false ); // using the wp_signon() function of wordpress
	if ( is_wp_error( $user ) ) { // checking the login with the is_wp_error() function of wordpress
		echo json_encode( array( 'loggedin'=>false, 'message'=>__( 'Invalid username or password.' ) ) ); // callback if fail
	} else {
		echo json_encode( array( 'loggedin'=>true, 'message'=>__( 'Login successful...' ) ) ); // callback if success	
	}

	wp_die();
}