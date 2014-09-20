<?php
/*
* nouveautes.php
* ---
* Template Name: nouveautes
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_nouveautes' ); ?>

<?php get_footer();