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

$sites = $cl_custom_type->get_sites_amis();
var_dump( $sites );
$alt = 0;
?>

<?php get_header(); ?>

<div class="col-md-12">

	<?php foreach ( $sites as $site ) : ?>
		<?php if ( $alt = 0 ) : ?>
			<div class=" col-md-offset-1 col-md-6 alert alert-success">
				<?php echo $site->content_fr; ?>
			</div>
			<?php $alt = 1; ?>
		<?php else : ?>
			<div class=" col-md-offset-1 col-md-6 alert alert-danger">
				<?php echo $site->content_fr; ?>
			</div>
			<?php $alt = 0; ?>
		<?php endif; ?>
	<?php endforeach; ?>
</div>

<?php get_footer(); ?>