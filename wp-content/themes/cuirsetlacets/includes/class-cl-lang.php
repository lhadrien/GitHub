<?php

class CL_Lang {

    public  $language = 'fr';
    private $page_content = array();

    public function choose_language_fr()
    {
        $this->language = 'fr';
        $this->fr = true;
        $this->en = false;
    }

    public function choose_language_en()
    {
        $this->language = 'en';
        $this->fr = false;
        $this->en = true;
    }

    // get the content depending of the language
    private function get_content( $post_id, $column, $table )
    {
        global $wpdb;

        return $wpdb->get_var( $wpdb->prepare(
            "
            SELECT  %s
            FROM    " . $table . "
            WHERE   %d
            LIMIT   1
            ",
            $column,
            $post_id
        ) );
    }

    // format the query to get the content depending of the langue
    public function get_content_by_lang( $post_id, $table, $lang = null )
    {
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
    
    // private function to get the values of the table cl_pages_content
    private function get_page_content( $page )
    {
        global $wpdb;
        
        return $wpdb->get_row( $wpdb->prepare(
            "
            SELECT  *
            FROM    cl_pages_content
            WHERE   page_name = %s
            LIMIT   1
            ",
            $page
        ) );
    }
    
    // private function to set the values of the table cl_pages_content
    private function set_page_content( $page, $content, $lang )
    {
        global $wpdb;

        if ( $content === NULL ) {
            return ( false );
        }
        $data = array(
            'content_' . $lang => $content
        );
        $where = array(
            'page_name' => $page
        );
        $result = $wpdb->update( 'cl_pages_content', $data, $where );
        return $result;
    }
    
    // function that return the content fr/en of the pages
    public function get_cuir_content( $page, $lang = '' )
    {
        if ( empty( $this->page_content ) ) {
            $this->page_content = $this->get_page_content( $page );
        }
        if ( $lang === '' ) {
            $lang = $this->language;
        }
        if ( $lang === 'fr' ) {
            return nl2br($this->page_content->content_fr);
        } elseif ( $lang === 'en' ) {
            return nl2br($this->page_content->content_en);
        }
        return false;
    }
    
    // function to update the content of the pages
    public function set_cuir_content( $page, $content, $lang )
    {
        if ( $lang !== 'fr' && $lang !== 'en' ) {
            return false;
        }
        $this->set_page_content( $page, stripcslashes( $content ), $lang );
    }
}