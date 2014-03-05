<?php
/*
* Home.php
* ---
* Template Name: home
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang, $current_user;

get_header( "index" ); ?>
<div class="background col-md-6 col-md-offset-3">
	<h1>Cuirs et Lacets</h1>
	<span class="col-md-2 col-md-offset-2"><a id="coussin_fr" class="coussin" href="<?php echo WP_HOME . '/fr/'; ?>" role="button"><img style="width: 140px; height: 140px;" src="<?php echo CL_IMG . 'coussin_fr.png'; ?>" alt="Cote Francais" /></a></span>
	<span class="col-md-2 col-md-offset-2"><a id="coussin_en" class="coussin" href="<?php echo WP_HOME . '/eng/'; ?>" role="button"><img style="width: 140px; height: 140px;" src="<?php echo CL_IMG . 'coussin_eng.png'; ?>" alt="English side" /></a></span>

</div>
<?php get_footer( 'index' ); ?>