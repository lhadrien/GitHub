<?php
/*
* agenda.php.php
* ---
* Template Name: agenda
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>
<?php get_the_post_thumbnail( 120, array( 290, 162) ); ?>

<?php echo $cl_lang->get_cuir_content( 'page_agenda' ); ?>

<?php get_footer();