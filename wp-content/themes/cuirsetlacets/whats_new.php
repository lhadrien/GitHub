<?php
/*
* whats_new.php
* ---
* Template Name: whats_new
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for nouveautes.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>
<h2>What's new ?</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_nouveautes' ); ?>
    </div>
</div>

<?php get_footer( 'en' ); ?>