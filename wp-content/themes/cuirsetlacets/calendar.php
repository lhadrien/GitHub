<?php
/*
* calendar.php
* ---
* Template Name: calendar
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
* ---
* template for agenda.php
*/

global $cl_lang;
$cl_lang->choose_language_en();
?>

<?php get_header(); ?>
<h2>My next events.</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_agenda' ); ?>
    </div>
</div>

<?php get_footer();