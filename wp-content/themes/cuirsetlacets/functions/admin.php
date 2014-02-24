<?php

function cuirs_admin_init() {

	add_meta_box( "title_english", "Titre Anglais", "title_english", "creations", "normal", "high" );
	add_meta_box( "description_meta", "Description Francaise/Anglaise", "description_meta", "creations", "normal", "low" );
}

?>