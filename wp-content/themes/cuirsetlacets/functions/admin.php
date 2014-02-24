<?php

function cuirs_admin_init() {

	add_meta_box( "title_english", "Titre Anglais", "title_english_meta", "creations", "normal", "high" );
	add_meta_box( "description_meta", "Description Francaise/Anglaise", "description_meta", "creations", "normal", "low" );
	add_meta_box( "images_creations", "Ajoute des images", "images_meta", "creations", "side", "low" );
}

?>