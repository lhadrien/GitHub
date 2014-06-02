<?php

function cuirs_admin_init() {

	add_meta_box( "title_english_creations", "Titre Anglais", "title_english_creations", "creations", "normal", "high" );
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
	} else {
		$content_fr = '';
		$content_en = '';
	}
	?>
		<p><label>Description FR :</label><br />
		<textarea cols="50" rows="5" name="content_fr" placeholder="description en francais"><?php echo $content_fr; ?></textarea></p>
		<p><label>Description EN :</label><br />
		<textarea cols="50" rows="5" name="content_en" placeholder="description en anglais"><?php echo $content_en; ?></textarea></p>
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
		<p><label>Description FR :</label><br />
		<textarea cols="50" rows="5" name="content_fr" placeholder="description en francais"><?php echo $content_fr; ?></textarea></p>
		<p><label>Description EN :</label><br />
		<textarea cols="50" rows="5" name="content_en" placeholder="description en anglais"><?php echo $content_en; ?></textarea></p>
	<?php
}

?>