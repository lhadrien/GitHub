<?php
/*
* creations_eng.php
* ---
* Template Name: creations_eng
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for creations.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>
<div class="row">
	<?php get_template_part( 'template', 'creations' ); ?>
</div>
<?php get_footer( 'en' ); ?>