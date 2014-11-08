<?php
/*
* learn_more.php
* ---
* Template Name: learn_more
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for savoir.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>
<h2>Want to learn more ?</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_savoir' ); ?>
    </div>
</div>

<?php get_footer( 'en' );