<?php
/*
* calendar.php
* ---
* Template Name: calendar
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for agenda.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_agenda' ); ?>

<?php get_footer();