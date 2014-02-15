<?php


// Versions | Increase the version everytime you update the style.css or cl.js file
define( 'CL_VERSION', '1.5.01' );
define( 'BOOTSTRAP_VERSION', '3.1.0' );
define( 'FONT_AWESOME_VERSION', '4.0.3' );


// define the PATHS
define( 'WP_HOME', home_url() );
define( 'ROOT', dirname( __FILE__ ) );
define( 'THEME_SLUG', 'cuirsetlacets' );
define( 'CL_PLUGINS' , ROOT . '/plugins' );
define( 'WP_CONTENT', get_bloginfo( 'wpurl' ) . '/wp-content' );
define( 'WP_MEDIA', WP_CONTENT . '/media' );
define( 'WP_THEME', get_stylesheet_directory_uri() );
define( 'CL_IMG', WP_THEME . '/img/' ); 

// define emails
define ( 'EMAIL_HADRIEN',  'lhadrien@gmail.com' );

// Misc
define( 'EOL', "\r\n" );	// End Of Line
define( 'CL_NOM', 'Cuirs et Lacets' );
define( 'CL_NAME', 'Laces and Leather' );