<?php

class	CL_Custom_type {

	public $type_post = '';
	public $arr_post_type = array(
		'fourreaux'					=> 8,
		'scabbards'					=> 8,
		'ceintures'					=> 9,
		'girdles'					=> 9,
		'escarcelles-et-bourses'	=> 10,
		'purses_pouchs'				=> 10,
		'divers'					=> 5,
		'miscellaneous'				=> 5
	);

	public function update_cuirs_meta( $post_id, $key, $value, $table ) {
	
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
		$return = $wpdb->update( 'cl_' . $table, $data, $where );
		return ( $return );
	}
	
	public function add_cuirs_meta( $post_id, $key, $value, $table ) {

		global $wpdb;
		
		if ( $key === NULL ) {
			return ( false );
		}
		$data = array(
			'post_id' 	=> $post_id,
			$key		=> $value
		);
		
		$wpdb->insert( 'cl_' . $table, $data );
	}
	
	public function get_cuirs_meta( $post_id = 0, $table ) {
	
		global $wpdb;
		
		if ( $post_id == 0 ) {
			return ( false );
		}
		if ( ! $table ) {
			$table = $this->type_post;
		}
		$table = 'cl_' . $table;
		return $wpdb->get_row( $wpdb->prepare(
			"
			SELECT	*
			FROM	" . $table . "
			WHERE	post_id = %d
			LIMIT	1
			",
			$post_id
		) );
	}
	
	public function get_sites_amis() {
		
		global $wpdb;
		
		$limit = 100;
		
		return $wpdb->get_results( $wpdb->prepare(
			"
			SELECT	*
			FROM	cl_sites_amis
			LIMIT	%d
			",
			$limit
		) );
	}
	
	private function get_all_creations() {
	
		global $wpdb;
		
		$limit = 1000;
		
		return $wpdb->get_results( $wpdb->prepare(
			"
			SELECT	*
			FROM	cl_term_relationships r
			JOIN	cl_creations c ON c.post_id = r.object_id
			LIMIT	%d
			",
			$limit
		) );
	}
	
	private function get_creations_by_type( $tax_id ) {
		
		global $wpdb;
		
		$limit = 1000;
		
		return $wpdb->get_results( $wpdb->prepare(
			"
			SELECT	*
			FROM	cl_term_relationships r
			JOIN	cl_creations c ON c.post_id = r.object_id
			WHERE	r.term_taxonomy_id = %d
			LIMIT	%d
			",
			$tax_id,
			$limit
		) );
	}
	
	public function get_creations() {
		
		global $post;
		
		if ( ! isset( $post->post_name ) ) {
			return ( false );
		}
		if ( array_key_exists( $post->post_name, $this->arr_post_type ) ) {
			echo $this->arr_post_type[ $post->post_name ];
			$creations = $this->get_creations_by_type( $this->arr_post_type[ $post->post_name ] );
			// gerer les creations
		} else {
			echo 'in the main page of the shop';
			$creations = $this->get_all_creations();
		}
		if ( count( $creations ) === 0 ) {
			echo 'no creations yet';
			return ( false );
		}
		return ( $creations );
	}
}