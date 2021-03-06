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
<div class="background2">
    <div class="background col-md-6 col-md-offset-3">
        <h1 id="title-home"><span class="appear"></span><span class="disappear">Cuirs et Lacets</span></h1>
        <span class="col-md-2 col-md-offset-2"><a id="coussin_fr" class="coussin" href="<?php echo CL_HOME . '/fr/'; ?>" role="button"><img style="width: 140px; height: 140px;" src="<?php echo CL_IMG . 'coussin_fr.png'; ?>" alt="Cote Francais" /></a></span>
        <span class="col-md-2 col-md-offset-2"><a id="coussin_en" class="coussin" href="<?php echo CL_HOME . '/eng/'; ?>" role="button"><img style="width: 140px; height: 140px;" src="<?php echo CL_IMG . 'coussin_eng.png'; ?>" alt="English side" /></a></span>
    </div>
    <div id="choose" class="col-md-6 col-md-offset-3">
        <p>Choisis ton camp</p><p class="small">Choose your side</p>
    </div>
</div>
<?php get_footer( 'index' ); ?>