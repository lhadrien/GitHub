<?php
/*
* cuirs.php
* ---
* Template Name: cuirs
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang, $current_user;
$cl_lang->choose_language_fr();
get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_home' ); ?>

<?php get_footer() ?>