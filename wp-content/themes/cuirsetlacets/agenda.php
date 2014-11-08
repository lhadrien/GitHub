<?php
/*
* agenda.php.php
* ---
* Template Name: agenda
* ---
* Site : Cuirs et Lacets
* Createur : Hadrien
*/

global $cl_lang;
$cl_lang->choose_language_fr();
?>

<?php get_header(); ?>

<h2>Mes prochaines date.</h2>
<div class="row">
    <div class="the-page col-md-12">
        <?php echo $cl_lang->get_cuir_content( 'page_agenda' ); ?>
    </div>
</div>

<?php get_footer();