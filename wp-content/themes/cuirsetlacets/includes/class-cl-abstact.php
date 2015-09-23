<?php

/**
 * Class abtraite pour definir le connecteur WordPressDataBase
 */
abstract class CL_Abstract {
	
	protected $wpdb = null;
	protected $post = null;
	
	public function __construct()
	{
		global $wpdb;
		global $post;
		
		$this->wpdb = $wpdb;
		$this->post = $post;
	}
}
