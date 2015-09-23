<?php

	global $cl_lang, $cl_custom_type, $cl_cat;
	
	$arr_menu_title = $cl_cat->get_menu_title();
	$arr_menu_url = $cl_cat->get_menu_urls();
?>

<div class="panel panel-default">
	<div class="panel-heading leather-effect effect-beige"><?php echo $arr_menu_title[ 0 ] ?></div>
	<div class="list-group">
		<?php for ( $i = 1; $i < count( $arr_menu_title ); $i++ ) : ?>
			<a href="<?php echo CL_HOME . $arr_menu_url[ $i - 1 ]; ?>" class="list-group-item">
				<?php echo $arr_menu_title[ $i ]; ?>
			</a>
		<?php endfor; ?>
	</div>
	<div class="panel-footer leather-effect effect-beige"></div>
</div>