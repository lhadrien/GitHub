<?php
/*
* orders.php
* ---
* Template Name: orders
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* Template for commandes.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<?php echo $cl_lang->get_cuir_content( 'page_commandes' ); ?>

<?php get_footer( 'en' ); ?>