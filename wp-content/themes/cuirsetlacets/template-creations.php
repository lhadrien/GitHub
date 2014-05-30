<?php
	global $cl_lang, $cl_custom_type;

?>

<div class="col-md-3">
	<?php get_template_part( 'part', 'sidebar' ); ?>
</div>
<?php $cl_custom_type->get_creation_by_type(); ?>