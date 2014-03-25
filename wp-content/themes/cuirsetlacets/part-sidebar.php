<?php
	global $cl_lang, $cl_custom_type;
	$arr_menu_title = array(	'Sommaire', 'Index',
								'Fourreaux', 'Scabbards',
								'Escarcelles & Bourses', 'Purses & Pouchs',
								'Ceintures', 'Girdles',
								'Divers', 'Miscelaneous' );
	$arr_menu_url = array(	'/boutique/fourreaux/', '/shop/scabbards/',
							'/boutique/escarcelles-et-bourses/', '/shop/purses_pouchs/',
							'/boutique/ceintures/', '/shop/girdles/',
							'/boutique/divers/', '/shop/miscellaneous/' );
	( $cl_lang->fr ) ? $select = 0 : $select = 1; 
	
?>

<div class="panel panel-default">
	<div class="panel-heading"><?php echo $arr_menu_title[ $select ] ?></div>
	<div class="list-group">
		<?php for ( $i = 0; $i < ( count( $arr_menu_url ) / 2 ); $i++ ) : ?>
			<a href="<?php echo CL_HOME . $arr_menu_url[ ( $i * 2 ) + $select ]; ?>" class="list-group-item">
				<?php echo $arr_menu_title[ ( ( $i + 1 ) * 2 ) + $select ]; ?>
			</a>
		<?php endfor; ?>
	</div>
</div>