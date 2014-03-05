<?php

function cuirs_init() {

	register_nav_menus(
		array(
		  'menu-principal' => __( 'Menu Principal' ),
		  'menu-boutique' => __( 'Menu Boutique' )
		)
	);
	wp_enqueue_script( 'bootstrap', WP_THEME . '/bootstrap/' . BOOTSTRAP_VERSION . '/js/bootstrap.min.js', null, null, true);
	
	// CUSTOM TYPE Creations
	register_post_type( 'creations', array(
			'labels' => array(
				'name'					=> __( 'Creations Wapapa' ),
				'singular_name' 		=> __( 'Creation' ),
				'add_new'				=> __( 'Ajouter une Creation' ),
				'edit_item'				=> __( 'Editer une Creation' ),
				'menu_name'				=> __( 'Creations' ),
				'view_item'				=> __( 'Voir les Creations' ),
				'search_items'			=> __( 'Gno, on cherche' ),
				'not_found'				=> __( "Ouin, rien n'a ete trouve" ),
				'not_found_in_trash'	=> __( 'Rien dans la corbeille' )
			),
			'public'				=> true,
			'publicly_queryable'	=> true,
			'show_ui'				=> true,
			'menu_position'			=> 4,
			'has_archive'			=> true,
			'hierarchical'			=> true,
			'label'					=> 'Question',
			'rewrite'				=> array(
				'slug'			=> 'creations',
				'with_front' 	=> true
			),
			'supports'		=> array(
				'title',
				'editor',
				'thumbnail'
			),
		)
	);
	register_taxonomy(	"type",
						array( "creations" ),
						array(
							"hierarchical"		=> true,
							"label"				=> "Types",
							"singular_label" 	=> "Type",
							"rewrite" 			=> true
						)
	);
	
	// CUSTOM TYPE Sites Amis
	register_post_type( 'amis', array(
			'labels' => array(
				'name'					=> __( 'Sites Amis' ),
				'singular_name' 		=> __( 'Site Ami' ),
				'add_new'				=> __( 'Ajouter un Site Ami' ),
				'edit_item'				=> __( 'Editer un Site Ami' ),
				'menu_name'				=> __( 'Sites Amis' ),
				'view_item'				=> __( 'Voir les Sites Amis' ),
				'search_items'			=> __( 'Gno, on cherche un site ami' ),
				'not_found'				=> __( "Ouin, pas de sites amis" ),
				'not_found_in_trash'	=> __( 'Pas de sites amis dans la corbeille' )
			),
			'public'				=> true,
			'publicly_queryable'	=> true,
			'show_ui'				=> true,
			'menu_position'			=> 5,
			'has_archive'			=> true,
			'hierarchical'			=> false,
			'label'					=> 'Question',
			'rewrite'				=> array(
				'slug'			=> 'sites-amis',
				'with_front' 	=> true
			),
			'supports'		=> array(
				'title',
				'thumbnail'
			),
		)
	);
}


function save_meta( $post_id, $post ) {
	
	// dispatch the right function to save
	if ( isset( $_POST[ 'edit_custom_creation' ] ) ) {
		$success = save_creation_meta( $post_id, $post );
        return $success;
    }
	
	if ( isset( $_POST[ 'edit_custom_site_ami' ] ) ) {
		$success = save_site_ami_meta( $post_id, $post );
		return $success;
	}
}

function save_creation_meta( $post_id, $post ) {

	global $cl_custom_type;
	
	$cl_custom_type->type_post = 'creations';
	$creation_meta = array();
	
	// check if we save from the editor
	if ( ! wp_verify_nonce( $_POST[ 'edit_custom_creation' ], plugin_basename(__FILE__) )) {
		return $post->ID;
	}
	// authorized ?
	if ( ! current_user_can( 'edit_post', $post->ID ) )
		return $post->ID;
	// make an array
	$creation_meta[ 'content_fr' ] = $_POST[ 'content_fr' ];
	$creation_meta[ 'content_en' ] = $_POST[ 'content_en' ];
	$creation_meta[ 'title_en' ] = $_POST[ 'title_en' ];
	// Add values of $events_meta as custom fields
	foreach ( $creation_meta as $key => $value ) { // Cycle through the $events_meta array!
	
		if ( $post->post_type == 'revision' ) {
			return ( false ); // Don't store custom data twice
		}
		$value = implode( ',', ( array ) $value ); // If $value is an array, make it a CSV (unlikely)
		
		if ( $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post ) ) { // If the post exist
			$cl_custom_type->update_cuirs_meta( $post->ID, $key, $value, $cl_custom_type->type_post ); // $post_id, $key, $value, $table
		} else { // If the does not exist
			$cl_custom_type->add_cuirs_meta( $post->ID, $key, $value, $cl_custom_type->type_post );
		}
	}

}

function save_site_ami_meta( $post_id, $post ) {

	global $cl_custom_type;
	$cl_custom_type->type_post = 'sites_amis';
	$site_ami_meta = array();


	// check if we save from the editor
/*	if ( ! wp_verify_nonce( $_POST[ 'edit_custom_site_ami' ], plugin_basename(__FILE__) )) {
		return $post->ID;
	} */
	// authorized ?
	if ( ! current_user_can( 'edit_post', $post->ID ) )
		return $post->ID;
	// make an array
	$site_ami_meta[ 'content_fr' ] = $_POST[ 'content_fr' ];
	$site_ami_meta[ 'content_en' ] = $_POST[ 'content_en' ];
	$site_ami_meta[ 'url_ami' ] = $_POST[ 'url_ami' ];
	// Add values of $events_meta as custom fields
	foreach ( $site_ami_meta as $key => $value ) { // Cycle through the $events_meta array!
	
		if ( $post->post_type == 'revision' ) {
			return ( false ); // Don't store custom data twice
		}
		$value = implode( ',', ( array ) $value ); // If $value is an array, make it a CSV (unlikely)
		if ( $cl_custom_type->get_cuirs_meta( $post->ID, $cl_custom_type->type_post ) ) { // If the post exist
			$cl_custom_type->update_cuirs_meta( $post->ID, $key, $value, $cl_custom_type->type_post );
		} else { // If the does not exist
			$cl_custom_type->add_cuirs_meta( $post->ID, $key, $value, $cl_custom_type->type_post );
		}
	}
}

add_action( 'save_post', 'save_meta', 1, 2 ); // save the custom fields



