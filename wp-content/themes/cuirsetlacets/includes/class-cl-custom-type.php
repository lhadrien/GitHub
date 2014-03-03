<?php

class	CL_Custom_type {

	public $type_post = '';

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
			FROM	%s
			WHERE	%d
			LIMIT	1
			",
			$table,
			$post_id
		) );
	}
}