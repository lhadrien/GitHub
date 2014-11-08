<?php
	global $cl_lang, $cl_custom_type;
	$sites = $cl_custom_type->get_sites_amis();
	$alt = 2;
?>

	<div class="row" id="sites">
<?php foreach ( $sites as $site ) : ?>

		<div class="text col-sm-offset-<?php echo $alt; ?> col-sm-6">
			<?php if ( $cl_lang->language == 'fr' ) : ?>
				<?php echo $site->content_fr; ?><br /><strong><a href="<?php echo $site->url_ami; ?>"><?php echo $site->url_ami; ?></a></strong>
			<?php else : ?>
				<?php echo $site->content_en; ?><br /><strong><a href="<?php echo $site->url_ami; ?>"><?php echo $site->url_ami; ?></a></strong>
			<?php endif; ?>
		</div>
		<?php ( $alt == 2 ) ? $alt = 4 : $alt = 2; ?>
<?php endforeach; ?>
	</div>