<?php

global $cl_lang, $cl_cat, $cl_custom_type;

$arr_cat = $cl_cat->get_name_cat();
$arr_cat_fr = $cl_cat->get_name_cat( true );
$arr_content = $cl_lang->get_cat_content();
$arr_menu_url = $cl_cat->get_menu_urls();
$arr_url = array(
    $arr_menu_url[1],
    $arr_menu_url[3],
    $arr_menu_url[2],
    $arr_menu_url[2],
    $arr_menu_url[4],
);
$index = 0;
?>

<div class="row">
    <div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
    </div>
    <div class="col-md-9">
        <div class="row">
            <?php foreach ($arr_cat as $key => $cat) : ?>
                <div class="col-sm-6 col-md-4">
                    <div class="thumbnail item-creation">
                        <div class="caption title">
                            <span class="label label-<?php $cl_cat->display_title_cat( $key, true ); ?>"><?php $cl_cat->display_title_cat( $key ); ?></span>
                        </div>
                        <?php
                            $images =  $cl_cat->get_image_cat( $key );
                            if ( $images !== false && count( $images ) >= 1 ) {
                                ?><img src="<?php echo $images{ 0 }->link; ?>" alt="<?php echo $images{ 0 }->post_title; ?>" /><?php
                            } else {
                                ?><div class="caption no-img"><p><?php _cl( "Pas d'image", 'No image' ); ?></p></div><?php
                            }
                        ?>
                        <div class="caption caption-content">
                            <h3><?php echo ucfirst($cat); ?></h3>
                            <p><?php _cl( $arr_content[ 'cat_' . strtolower( $arr_cat_fr[ $key ] ) ][ 'fr' ], $arr_content[ 'cat_' . strtolower( $arr_cat_fr[ $key ] ) ][ 'en' ] ); ?></p>
                        </div>
                        <div class="caption footer">
                            <a href="<?php echo $arr_url[$index++]; ?>" class="btn btn-danger btn-xs" role="button"><?php _cl( 'Voir le rayon ' . $cat, $cat . ' section' ); ?> <i class="glyphicon glyphicon-chevron-right"></i></a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>