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
$creation = $cl_custom_type->get_creation();
?>

<?php get_header(); ?>
<div class="row">
    <div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
    </div>
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-7">
                <?php
                    $images =  $cl_custom_type->get_images( $post->ID );
                    // var_dump( $images );
                    $nb_images = count( $images );
                    if ( $nb_images >= 1 ) {
                        ?>
                        <div id="creation_carousel" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                                <?php for ( $i = 0; $i < $nb_images; $i++ ) : ?>
                                    <li data-target="#creation_carousel" data-slide-to="<?php echo $i; ?>"<?php if ( $i === 0 ) : echo ' class="active"'; endif; ?>></li>
                                <?php endfor; ?>
                            </ol>

                            <!-- Wrapper for slides -->
                            <div class="carousel-inner">
                                <?php for ( $i = 0; $i < $nb_images; $i++ ) : ?>
                                    <div class="item<?php if ( $i === 0 ) : echo ' active'; endif; ?>">
                                        <img src="<?php echo $images{ $i }->link; ?>" alt="<?php echo $images{ $i }->post_title; ?>" />
                                        <div class="carousel-caption">
                                          ...
                                        </div>
                                    </div>
                                <?php endfor; ?>
                            </div>
                            <a class="left carousel-control" href="#creation_carousel" role="button" data-slide="prev">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                            </a>
                            <a class="right carousel-control" href="#creation_carousel" role="button" data-slide="next">
                                <span class="glyphicon glyphicon-chevron-right"></span>
                            </a>
                        </div>
                        <?php
                    } else {
                        _cl( "Pas d'image", 'No image' );
                    }
                ?>
            </div>
            <div class="col-md-5">
                <h3><u><?php _cl('Caractéristiques', 'Specifications'); ?> :</u></h3>
                <dl class="dl-horizontal">
                    <dt><?php _cl( 'Date', 'Date' ); ?> :</dt>
                    <dd><?php echo (isset($creation->epoque)) ? $creation->epoque : 'N/C'; ?></dd>
                    <dt><?php _cl( 'Taille', 'Size' ); ?> :</dt>
                    <dd><?php echo (isset($creation->size)) ? $creation->size : 'N/C'; ?></dd>
                    <dt><?php _cl( 'Couleurs disponibles', 'available colours' ); ?> :</dt>
                    <dd>N/C</dd>
                    <dt class="price"><?php _cl( 'Prix', 'Price' ); ?> :</dt>
                    <dd class="price price-value"><?php echo (isset($creation->price)) ? $creation->price : 'N/C'; ?> €</dd>
                </dl>
            </div>
        </div>
        <hr />
        <div>
            <?php if ( $cl_lang->language == 'fr' ) : ?>
                <?php echo (isset($creation->content_fr)) ? $creation->content_fr : 'Pas de description'; ?>
            <?php else : ?>
                <?php echo (isset($creation->content_en)) ? $creation->content_en : 'No descriptions'; ?>
            <?php endif; ?>
        </div>
    </div>
</div>
<?php get_footer();