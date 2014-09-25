<?php
/*
* Single-creations.php
* ---
* Template Name: single-creations
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>
<div class="row">
    <div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
    </div>
    <div class="col-md-9">
        <?php
            $images =  $cl_custom_type->get_images( $post->ID );
            // var_dump( $images );
            $nb_images = count( $images );
            if ( $nb_images >= 1 ) {
                ?>
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <?php for ( $i = 0; $i < $nb_images; $i++ ) : ?>
                            <li data-target="#carousel-example-generic" data-slide-to="<?php echo $i; ?>"<?php if ( $i === 0 ) : echo ' class="active"'; endif; ?>></li>
                        <?php endfor; ?>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <?php for ( $i = 0; $i < $nb_images; $i++ ) : ?>
                            <div class="item<?php if ( $i === 0 ) : echo ' active'; endif; ?>">
                                <img src="<?php echo $images{ $i }->link; ?>" alt="<?php echo $images{ $i }->post_title; ?>" />
                                <div class="carousel-caption">
                                  penis
                                </div>
                            </div>
                        <?php endfor; ?>
                    </div>
                    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
                <?php
            } else {
                _cl( "Pas d'image", 'No image' );
            }
        ?>
    </div>
</div>
<?php get_footer();