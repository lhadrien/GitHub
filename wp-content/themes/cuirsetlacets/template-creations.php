<?php
	global $cl_lang, $cl_custom_type, $cl_cat;

?>

<div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
</div>
<div class="col-md-9">
	<?php $creations = $cl_custom_type->get_creations(); ?>
	<?php /*var_dump( $creations );*/ ?>
	<div class="row">
		<?php foreach ( $creations as $creation ) : ?>
			<div class="col-sm-6 col-md-4">
				<div class="thumbnail">
					<div class="caption">
						<span class="label label-<?php $cl_cat->display_title_cat( $creation->term_taxonomy_id, true ); ?>"><?php $cl_cat->display_title_cat( $creation->term_taxonomy_id ); ?></span>
					</div>
					<?php
						$images =  $cl_custom_type->get_images( $creation->post_id );
						// var_dump( $images );
						if ( count( $images ) >= 1 ) {
							?><img src="<?php echo $images{ 0 }->link; ?>" alt="<?php echo $images{ 0 }->post_title; ?>" /><?php
						} else {
							_cl( "Pas d'image", 'No image' );
						}
					?>
					<div class="caption">
						<h3><?php echo get_the_title( $creation->post_id ); ?></h3>
						<p><?php _cl( $creation->content_fr, $creation->content_en ); ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>