<?php

class CL_Site_ami {

	public function update_site_ami_meta( $post_id, $key, $value ) {
	
		global $wpdb;
		
		if ( $key === NULL ) {
			return ( false );
		}
		$data = array(
			$key => $value
		);
		$where = array(
			'post_id' => $post_id
		);
		$return = $wpdb->update( 'cl_sites_amis', $data, $where );
		return ( $return );
	}
	
	public function add_site_ami_meta( $post_id, $key, $value ) {

		global $wpdb;
		
		if ( $key === NULL ) {
			return ( false );
		}
		$data = array(
			'post_id' 	=> $post_id,
			$key		=> $value
		);
		
		$wpdb->insert( 'cl_sites_amis', $data );
	}
	
	public function get_site_ami_meta( $post_id = 0 ) {
	
		global $wpdb;
		
		if ( $post_id == 0 ) {
			return ( false );
		}
		return $wpdb->get_row( $wpdb->prepare(
			"
			SELECT	*
			FROM	cl_sites_amis
			WHERE	%d
			LIMIT	1
			",
			$post_id
		) );
	}

	// get the content depending of the langue
	private function get_content( $post_id, $column ) {
	
		global $wpdb;
		
		return $wpdb->get_var( $wpdb->prepare(
			"
			SELECT	%s
			FROM	cl_sites_amis
			WHERE	%d
			LIMIT	1
			",
			$column,
			$post_id
		) );
	}
	
	// format the query to get the content depending of the langue
	public function get_content_by_lang( $post_id = 0, $lang = 'fr' ) {
		
		if ( $post_id == 0 ) {
			return ( false );
		}
		if ( $lang == 'fr' ) {
			$column = 'content_fr';
		} else {
			$column = 'content_en';
		}
		$content = $this->get_content( $post_id, $column );
		return ( stripslashes( $content ) );
	}
	
}
