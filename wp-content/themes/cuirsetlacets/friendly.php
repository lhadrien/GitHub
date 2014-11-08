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

<h2>This is my friendly websites</h2>
<p><?php echo $cl_lang->get_cuir_content( 'page_sites' ); ?></p>
    <?php get_template_part( 'template', 'sites' ); ?>
<?php get_footer( 'en' );