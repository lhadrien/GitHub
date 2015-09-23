<?php
	global $cl_lang, $cl_custom_type, $cl_cat;

?>

<div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
</div>
<div class="col-md-9">
    <?php $creations = $cl_custom_type->get_creations(); ?>
    <?php var_dump( $creations ); ?>
    <div class="row">
        <?php foreach ( $creations as $creation ) : ?>
            <div class="col-sm-6 col-md-4">
                <div class="thumbnail item-creation leather-effect">
                    <div class="caption title">
                        <span class="label label-<?php $cl_cat->display_title_cat( $creation->term_taxonomy_id, true ); ?>"><?php $cl_cat->display_title_cat( $creation->term_taxonomy_id ); ?></span>
                    </div>
                    <?php
                        $image =  $cl_custom_type->get_images_size( $creation->post_id, 'medium', true );
                        if ( $image ) {
                            echo $image;
                        } else {
                            ?><div class="caption no-img"><p><?php _cl( "Pas d'image", 'No image' ); ?></p></div><?php
                        }
                    ?>
                    <div class="caption caption-content">
                        <h3><?php _cl( get_the_title( $creation->post_id ), $creation->title_en ); ?></h3>
                        <p><?php _cl( $creation->content_fr, $creation->content_en ); ?></p>
                    </div>
                    <div class="caption footer">
                        <a href="<?php echo get_permalink( $creation->object_id ); ?>" class="btn btn-primary btn-xs" role="button"><?php _cl( 'Voir...', 'See more...' ); ?></a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>