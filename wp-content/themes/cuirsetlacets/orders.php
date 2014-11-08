<?php
/*
* orders.php
* ---
* Template Name: orders
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* Template for commandes.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>
<h2>Order now!</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_commandes' ); ?>
    </div>
</div>

<?php get_footer( 'en' );