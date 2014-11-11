<?php

function __cl( $arg_fr = '', $arg_en = '' ) {
	
    global $cl_lang;

    if ( $arg_fr === '' ) {
        return ( false );
    }
    if ( $arg_en === '' ) {
        return ( $arg_fr );
    }
    if ( isset( $cl_lang->fr ) && $cl_lang->fr ) {
        return ( $arg_fr );
    } else {
        return ( $arg_en );
    }
}

function _cl( $arg_fr = '', $arg_en = '' ) {
	
    global $cl_lang;

    if ( $arg_fr === '' ) {
        return ( false );
    }
    if ( $arg_en === '' ) {
        echo $arg_fr;
        return ( false );
    }
    if ( isset( $cl_lang->fr ) && $cl_lang->fr ) {
        echo $arg_fr;
    } else {
        echo $arg_en;
    }
    return ( true );
}