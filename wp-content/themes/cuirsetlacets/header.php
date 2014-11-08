<?php
/**
 * The Header template for our theme
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WordPress
 * @subpackage Twenty_Thirteen
 * @since Twenty Thirteen 1.0
 */

global $cl_lang;
 ?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="stylesheet" href="<?php echo WP_THEME; ?>/bootstrap/<?php echo BOOTSTRAP_VERSION; ?>/css/bootstrap.min.css?ver=<?php echo CL_VERSION; ?>" type="text/css" media="all" />
    <link rel="stylesheet" href="<?php echo WP_THEME; ?>/bootstrap/<?php echo BOOTSTRAP_VERSION; ?>/css/bootstrap-theme.css?ver=<?php echo CL_VERSION; ?>" type="text/css" media="all" />
    <link rel="stylesheet" href="<?php echo WP_THEME; ?>/font-awesome/<?php echo FONT_AWESOME_VERSION; ?>/css/font-awesome.css?ver=<?php echo CL_VERSION; ?>" type="text/css" media="all" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <link href="<?php echo CL_HOME; ?>/favicon.ico" rel="shortcut icon" type="image/x-icon">
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <div class="container container-site theme-showcase" role="main" id="page">
        <header id="masthead" role="banner">
            <div>
                    <a class="navbar-brand" href="<?php bloginfo('url')?>"><?php bloginfo('name')?></a>
                    <?php require( 'includes/top-bar.php' ); ?>
            </div>
        </header><!-- #masthead -->
        <div id="site-main">
