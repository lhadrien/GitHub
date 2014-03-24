<?php
	global $cl_lang, $cl_custom_type;
	$alt = 2;
?>

<div class="panel panel-default">
	<div class="panel-heading"><?php echo ( $cl_lang->fr ) ? 'Sommaire' : 'Index'; ?></div>
	<div class="list-group">
		<a href="<?php echo CL_HOME; echo ( $cl_lang->fr ) ? '/boutique/fourreaux/' : '/shop/scabbards/'; ?>" class="list-group-item">
			<?php echo ( $cl_lang->fr ) ? 'Fourreaux' : 'Scabbards'; ?>
		</a>
		<a href="<?php echo CL_HOME; echo ( $cl_lang->fr ) ? '/boutique/escarcelles-et-bourses/' : '/shop/purses_pouchs/'; ?>" class="list-group-item">
			<?php echo ( $cl_lang->fr ) ? 'Escarcelles & Bourses' : 'Purses & Pouchs'; ?>
		</a>
		<a href="<?php echo CL_HOME; echo ( $cl_lang->fr ) ? '/boutique/ceintures/' : '/shop/girdles/'; ?>" class="list-group-item">
			<?php echo ( $cl_lang->fr ) ? 'Ceintures' : 'Girdles'; ?>
		</a>
		<a href="<?php echo CL_HOME; echo ( $cl_lang->fr ) ? '/boutique/divers/' : '/shop/miscellaneous/'; ?>" class="list-group-item">
			<?php echo ( $cl_lang->fr ) ? 'Divers' : 'Miscellaneous'; ?>
		</a>
	</div>
</div>