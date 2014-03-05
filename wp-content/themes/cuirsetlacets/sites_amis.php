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
$alt = 0;
?>

<?php get_header(); ?>

<div class="col-sm-12">

	<?php foreach ( $sites as $site ) : ?>
		<?php if ( $alt == 0 ) : ?>
			<div class=" col-sm-offset-1 col-sm-6 alert alert-success">
				<strong>en FR :</strong><?php echo $site->content_fr; ?><br /><strong>Et en ENG :</strong><?php echo $site->content_en; ?><br />et URL : <?php echo $site->url_ami; ?>
			</div>
			<?php $alt = 1; ?>
		<?php else : ?>
			<div class=" col-sm-offset-3 col-sm-6 alert alert-danger">
				<strong>en FR :</strong><?php echo $site->content_fr; ?><br /><strong>et en ENG :</strong><?php echo $site->content_en; ?><br />et URL : <?php echo $site->url_ami; ?>
			</div>
			<?php $alt = 0; ?>
		<?php endif; ?>
	<?php endforeach; ?>
</div>

<?php get_footer(); ?>