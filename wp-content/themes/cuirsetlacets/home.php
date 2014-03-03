<?php
/*
* Home.php
* ---
* Template Name: home
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_user, $current_user;

get_header(); ?>
<div class="background">
	<h1>Cuirs et Lacets</h1>
	<a id="coussin_fr" class="coussin " href="<?php echo WP_HOME . '/fr/'; ?>" role="button"><img src="<?php echo CL_IMG . 'coussin_fr.png'; ?>" alt="Cote Francais" /></a>
	<a id="coussin_en" class="coussin" href="<?php echo WP_HOME . '/eng/'; ?>" role="button"><img src="<?php echo CL_IMG . 'coussin_eng.png'; ?>" alt="English side" /></a>

</div>
<?php get_footer(); ?>