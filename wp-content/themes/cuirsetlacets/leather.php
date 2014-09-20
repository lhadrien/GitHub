<?php
/*
* Leather.php
* ---
* Template Name: leather
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* Template for home.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_home' ); ?>

<?php get_footer( 'en' ); ?>