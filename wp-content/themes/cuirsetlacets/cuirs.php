<?php
/*
* cuirs.php
* ---
* Template Name: cuirs
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang, $current_user;
$cl_lang->choose_language_fr();
get_header(); ?>
<h2>Bienvenue sur mon site de créations en cuir !</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_home' ); ?>
    </div>
</div>


<?php get_footer() ?>