<?php
/*
* sites_amis.php
* ---
* Template Name: sites_amis
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang, $cl_custom_type;
$cl_lang->choose_language_fr();

?>

<?php get_header(); ?>

<div id="sites" class="col-sm-12">
	<?php get_template_part( 'template', 'sites' ); ?>
</div>

<?php get_footer(); ?>