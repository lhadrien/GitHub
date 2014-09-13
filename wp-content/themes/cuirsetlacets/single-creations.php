<?php
/*
* Single-creations.php
* ---
* Template Name: single-creations
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>
<div class="row">
	<?php get_template_part( 'template', 'creations' ); ?>
</div>
<?php get_footer(); ?>