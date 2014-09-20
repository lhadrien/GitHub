<?php
/*
* friendly.php
* ---
* Template Name: friendly_websites
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for sites_amis.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<p><?php echo $cl_lang->get_cuir_content( 'page_sites' ); ?></p>

<div id="sites" class="col-sm-12">
	<?php get_template_part( 'template', 'sites' ); ?>
</div>
<?php get_footer( 'en' ); ?>