<?php
/*
* commandes.php
* ---
* Template Name: commandes
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_commandes' ); ?>

<?php get_footer();