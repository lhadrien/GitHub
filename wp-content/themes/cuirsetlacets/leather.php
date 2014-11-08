<?php
/*
* Leather.php
* ---
* Template Name: leather
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* Template for home.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>

<h2>Welcome to my new website dedicated to my leather creations !</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_home' ); ?>
    </div>
</div>

<?php get_footer( 'en' );