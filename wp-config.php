<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'cuirsetlacets_db');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'ifmEV2CsrrYDA%b-1M_>zoq{O<&MoCgWoj;cvar~K<WpW#iwtN+O13<8*s>LjSi5');
define('SECURE_AUTH_KEY',  '/q&Pt?nnl]v!+#}B[/(n/ gcd_df#2z+98.Rk<$5vu1x5%83%9_>0-)XD@=y*H`|');
define('LOGGED_IN_KEY',    'Es@<2l8CtioGA`TIy56BzLLgNO^#OD1]?4^b*Z-#bam<tc-?&KV%KW%oQZ]_QhOd');
define('NONCE_KEY',        'fy0 p-PIzq|Y1[U-EknETw,W.Dq=;=s:EBp(dD[s|4oD*.{t(>e6=)|En0w/z4{+');
define('AUTH_SALT',        'NY5yUL4}7>;+tb]>ZbSmV)jk.Mo_$TYUwjQ&d-)(b|+{-3.o|mi%lPkKj?%zI&MX');
define('SECURE_AUTH_SALT', 'F)`i IN]Q!88~[*8b.rJu%+Ar0$L4UF$Q;,r0r_s8mZaM#_+Z @U(+O!Y[K!6Z2`');
define('LOGGED_IN_SALT',   '-+?9`4gSfa: [gT~]1T7-b-0^*BdH|s+oCK}O|T-,;hFfIfa.DI+6=--|~k-4dku');
define('NONCE_SALT',       '5#a4G/;o$T$.G`@KxT7EJT{I}M87P<b}k|3EDE_ry.Jbb|epXlt)LsIjlFJUK%k@');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'cl_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'fr_FR');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
 // Enable WP_DEBUG mode
define('WP_DEBUG', true);

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

// Disable display of errors and warnings 
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);

// Use dev versions of core JS and CSS files (only needed if you are modifying these core files)
define('SCRIPT_DEBUG', true);
define( 'ERRORLOGFILE', WP_CONTENT_DIR.$ds.'logs'.$ds.'mu_error.log' );

@ini_set( 'log_errors', 'On' );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
