<?php
/*
* sites_aamis.php
* ---
* Template Name: sites_aamis
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for sites_aamis.php
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>

<h2>Voici les sites amis !</h2>
<p><?php echo $cl_lang->get_cuir_content( 'page_sites' ); ?></p>
	<?php get_template_part( 'template', 'sites' ); ?>
<?php get_footer();