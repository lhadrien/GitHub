<?php
/*
* shop.php
* ---
* Template Name: shop
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* Template for boutique.php
*/

global $cl_lang;
$cl_lang->choose_language_en();

get_header();

get_template_part( 'template', 'boutique' );

get_footer();