<?php

function cuirs_admin_init() {

	add_meta_box( "title_english_creations", "Titre Anglais :", "title_english_creations", "creations", "normal", "high" );
        add_meta_box( "epoque_creations", "L'epoque de l'objet :", "epoque_creations", "creations", "normal", "high" );
        add_meta_box( "size_creations", "La taille de l'objet :", "size_creations", "creations", "normal", "high" );
        add_meta_box( "price_creations", "Le prix :", "price_creations", "creations", "normal", "high" );
	add_meta_box( "description_creations", "Description Francaise/Anglaise", "description_creations", "creations", "normal", "low" );
	add_meta_box( "images_creations", "Ajoute des images", "images_creations", "creations", "side", "low" );
	add_meta_box( "url_amis", "Lien vers le site ami", "url_amis", "amis", "normal", "high" );
	add_meta_box( "description_amis", "Description Francaise/Anglaise", "description_amis", "amis", "normal", "low" );
}

function description_creations() {

	global $post, $cl_custom_type;
	
	$cl_custom_type->type_post = 'creations';
	
	// Noncename needed to verify where the data originated
	echo '<input type="hidden" name="edit_custom_creation" id="edit_custom_creation" value="' .
	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
	
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$content_fr = $metas->content_fr;
		$content_en = $metas->content_en;
                $epoque = $metas->epoque;
                $size = $metas->size;
                $price = $metas->price;
	} else {
		$content_fr = '';
		$content_en = '';
	}
	?>
        <p>
            <label>Description FR :</label>
            <br />
            <?php wp_editor( $content_fr , 'description_fr', array('textarea_name' => 'content_fr') ); ?>
        </p>
        <hr />
        <p>
            <label>Description EN :</label>
            <br />
            <?php wp_editor( $content_en , 'description_en', array('textarea_name' => 'content_en') ); ?>
        </p>
	<?php
}

function title_english_creations() {

	global $post, $cl_custom_type;

	$cl_custom_type->type_post = 'creations';

	// Get the location data if its already been entered
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$title_en = $metas->title_en;
	} else {
		$title_en = '';
	}
	// Echo out the field
	echo '<input type="text" name="title_en" value="' . $title_en  . '" class="widefat" />';
}

function epoque_creations() {

	global $post, $cl_custom_type;

	$cl_custom_type->type_post = 'creations';

	// Get the location data if its already been entered
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$epoque = $metas->epoque;
	} else {
		$epoque = '';
	}
	// Echo out the field
	echo '<input type="text" name="epoque" value="' . $epoque  . '" class="widefat" />';
}

function size_creations() {

	global $post, $cl_custom_type;

	$cl_custom_type->type_post = 'creations';

	// Get the location data if its already been entered
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$size = $metas->size;
	} else {
		$size = '';
	}
	// Echo out the field
	echo '<input type="text" name="size" value="' . $size  . '" class="widefat" />';
}

function price_creations() {

	global $post, $cl_custom_type;

	$cl_custom_type->type_post = 'creations';

	// Get the location data if its already been entered
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$price = $metas->price;
	} else {
		$price = '';
	}
	// Echo out the field
	echo '<input type="text" name="price" value="' . $price  . '" class="widefat" />';
}

function images_creations() {
	
    global $post;	
	
//	echo '<input type="file" name="images_meta" value"prout" class="widefat" />';
    ?>
    <tr valign="top">
        <th scope="row">Telecharge une image</th>
    </tr>
    <tr>
        <td>
            <label for="upload_image">
                <input id="upload_image" class="upload_button" type="text" size="28" name="upload_image" value="" />
                <input id="upload_image_button" type="file" value="Upload Image" name="prout" /><br />
            </label>
        </td>
    </tr>
    <?php
}

function url_amis() {

	global $post, $cl_custom_type;

	$cl_custom_type->type_post = 'sites_amis';
	
	// Noncename needed to verify where the data originated
	echo '<input type="hidden" name="edit_custom_site_ami" id="edit_custom_site_ami" value="' .
	wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
	
	$metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
	if ( $metas ) {
		$url_ami = $metas->url_ami;
	} else {
		$url_ami = '';
	}
	?>
		<p><label>Lien :</label></p>
		<p><input type="text" size="60" name="url_ami" value="<?php echo $url_ami; ?>" id="url_ami" /></p>
	<?php
}

function description_amis() {

    global $post, $cl_custom_type;

    $cl_custom_type->type_post = 'sites_amis';

    echo '<input type="hidden" name="edit_custom_site_ami2" id="edit_custom_site_ami2" value="' .
    wp_create_nonce( plugin_basename(__FILE__) ) . '" />';

    $metas = $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post );
    if ( $metas ) {
            $content_fr = $metas->content_fr;
            $content_en = $metas->content_en;
    } else {
            $content_fr = '';
            $content_en = '';
    }
    ?>
    <p>
        <label>Description FR :</label>
        <br />
        <?php wp_editor( $content_fr , 'description_fr', array('textarea_name' => 'content_fr') ); ?>
    </p>
    <hr />
    <p>
        <label>Description EN :</label>
        <br />
        <?php wp_editor( $content_en , 'description_en', array('textarea_name'=>'content_en') ); ?>
    </p>
    <?php
}

/**
 * function page Home
 */
function page_home()
{
    edit_page('page_home');
}

/**
 * function page Commande
 */
function page_commandes()
{
    edit_page('page_commandes');
}

/**
 * function page Nouveaute
 */
function page_nouveautes()
{
    edit_page('page_nouveautes');
}

/**
 * function page Savoir
 */
function page_savoir()
{
    edit_page('page_savoir');
}

/**
 * function page Agenda
 */
function page_agenda()
{
    edit_page('page_agenda');
}

/**
 * function page Sites
 */
function page_sites()
{
    edit_page('page_sites');
}

function page_boutique()
{
    edit_page('page_boutique');
}

/**
 *  
 */
function cl_admin_page_menu() {
    add_menu_page( 'Admin CL', __( 'Les pages du site' ), 'administrator', 'pages_du_site', 'cl_admin_page', '', 3 );
    add_submenu_page( 'pages_du_site', 'Accueil', 'Accueil', 'administrator', 'page_home', 'page_home' ); 
    add_submenu_page( 'pages_du_site', 'Boutique', 'Boutique', 'administrator', 'page_boutique', 'page_boutique' );
    add_submenu_page( 'pages_du_site', 'Commandes', 'Commandes', 'administrator', 'page_commandes', 'page_commandes' );
    add_submenu_page( 'pages_du_site', 'Nouveautés', 'Nouveautés', 'administrator', 'page_nouveautes', 'page_nouveautes' ); 
    add_submenu_page( 'pages_du_site', 'En savoir plus', 'En savoir plus', 'administrator', 'page_savoir', 'page_savoir' );
    add_submenu_page( 'pages_du_site', 'Agenda', 'Agenda', 'administrator', 'page_agenda', 'page_agenda' ); 
    add_submenu_page( 'pages_du_site', 'Sites amis', 'Sites amis', 'administrator', 'page_sites', 'page_sites' );
    add_menu_page( 'Admin Category', __( 'Les catégories créations' ), 'administrator', 'categories_du_site', 'cl_admin_cat_page', '', 4 ); 
}

add_action( 'admin_menu', 'cl_admin_page_menu' );

function edit_page( $page )
{
    global $cl_lang;
    
    if (isset( $_POST[ $page . '_fr' ] ) ) {
        $cl_lang->set_cuir_content( $page, $_POST[ $page . '_fr' ], 'fr' );
    }
    if (isset( $_POST[ $page . '_en' ] ) ) {
        $cl_lang->set_cuir_content( $page, $_POST[ $page . '_en' ], 'en' );
    }
    ?>
    <div id="poststuff">
        <form action="" method="POST">
            <h3>Contenu en Francais</h3>
            <?php wp_editor( $cl_lang->get_cuir_content( $page, 'fr' ), 'page_content_fr', array( 'textarea_name' => $page . '_fr' ) ); ?>
            <h3>Contenu en Anglais</h3>
            <?php wp_editor( $cl_lang->get_cuir_content( $page, 'en' ), 'page_content_en', array( 'textarea_name' => $page . '_en' ) ); ?>
            <input type="submit" class="button button-primary button-large">
        </form>
    </div>
    <?php
}


/*********** CATEGORY MENU ***********/

function cl_admin_cat_page() {
    
    global $cl_lang;
    
    if (isset( $_POST[ 'submit_cat' ] ) ) {
        $cl_lang->set_cat_content( $_POST );
    }
    $arr_cat = $cl_lang->get_cat_content();
    ?>
    <h2>Les Catégories du site</h2>
    <p>Ici remplir une description courtes des catégories du site. Elles seront visible dans le sommaire de la boutique, pour indiquer les différentes sections</p>
    <hr />
    <div id="poststuff">
        <form action="" method="POST">
            <p>
                <label for="description_fourreau_fr">Description Fourreau FR :</label>
                <textarea id="description_fourreau_fr" name="description_fourreau_fr" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_fourreau' ]['fr']; ?></textarea>
            </p>
            <p>
                <label for="description_fourreau_en">Description Fourreau EN :</label>
                <textarea id="description_fourreau_en" name="description_fourreau_en" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_fourreau' ]['en']; ?></textarea>
            </p>
            <p>
                <label for="description_escarcelle_fr">Description Escarcelle FR :</label>
                <textarea id="description_escarcelle_fr" name="description_escarcelle_fr" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_escarcelle' ]['fr']; ?></textarea>
            </p>
            <p>
                <label for="description_escarcelle_en">Description Escarcelle EN :</label>
                <textarea id="description_escarcelle_en" name="description_escarcelle_en" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_escarcelle' ]['en']; ?></textarea>
            </p>
            <p>
                <label for="description_bourse_fr">Description Bourse FR :</label>
                <textarea id="description_bourse_fr" name="description_bourse_fr" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_bourse' ]['fr']; ?></textarea>
            </p>
            <p>
                <label for="description_bourse_en">Description Bourse EN :</label>
                <textarea id="description_bourse_en" name="description_bourse_en" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_bourse' ]['en']; ?></textarea>
            </p>
            <p>
                <label for="description_ceinture_fr">Description Ceinture FR :</label>
                <textarea id="description_ceinture_fr" name="description_ceinture_fr" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_ceinture' ]['fr']; ?></textarea>
            </p>
            <p>
                <label for="description_ceinture_en">Description Ceinture EN :</label>
                <textarea id="description_ceinture_en" name="description_ceinture_en" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_ceinture' ]['en']; ?></textarea>
            </p>
            <p>
                <label for="description_divers_fr">Description Divers FR :</label>
                <textarea id="description_divers_fr" name="description_divers_fr" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_divers' ]['fr']; ?></textarea>
            </p>
            <p>
                <label for="description_divers_en">Description Divers EN :</label>
                <textarea id="description_diver_en" name="description_divers_en" placeholder="Pas de description encore..." rows="4" cols="75"><?php echo $arr_cat[ 'cat_divers' ]['en']; ?></textarea>
            </p>
            <hr />
            <input type="submit" class="button button-primary button-large" name="submit_cat" value="Valider les changements">
        </form>
    </div>
    
    <?php
}
