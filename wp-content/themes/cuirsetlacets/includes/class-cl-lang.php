<?php

class CL_Lang {

	public $language = 'fr';
	
	public function choose_language_fr() {
		
		$this->language = 'fr';
	}
	
	public function choose_language_en() {
		
		$this->language = 'en';
	}
	
	// get the content depending of the language
	private function get_content( $post_id, $column, $table ) {
	
		global $wpdb;
		
		return $wpdb->get_var( $wpdb->prepare(
			"
			SELECT	%s
			FROM	" . $table . "
			WHERE	%d
			LIMIT	1
			",
			$column,
			$post_id
		) );
	}
	
	// format the query to get the content depending of the langue
	public function get_content_by_lang( $post_id, $table, $lang = null ) {
		
		if ( $post_id == 0 ) {
			return ( false );
		}
		if ( ! $lang ) {
			$lang = $this->language;
		}
		$column = 'content_' . $lang;
		
		$content = $this->get_content( $post_id, $column, $table );
		return ( stripslashes( $content ) );
	}
}