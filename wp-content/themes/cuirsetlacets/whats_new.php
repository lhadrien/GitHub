<?php
/*
* whats_new.php
* ---
* Template Name: whats_new
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for nouveautes.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_nouveautes' ); ?>

<?php get_footer( 'en' ); ?>