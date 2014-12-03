<nav class="navbar navbar-default" role="navigation">
<?php
    global $cl_lang;
    if ( $cl_lang->language === 'fr' ) {
        $lang_menu = 'menu-principal';
    } elseif ( $cl_lang->language === 'en' ) {
        $lang_menu = 'main-menu';
    } else {
        echo "menu not defined...";
        $lang_menu = "menu-principal";
    }

    wp_nav_menu( array(
        'theme_location'    => $lang_menu,
        'depth'             => 2,
        'container'         => 'div',
        'container_class'   => 'navbar-collapse navbar-ex1-collapse navbar-site',
        'menu_class'        => 'nav navbar-nav',
        'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
        'walker'            => new wp_bootstrap_navwalker())
    );
?>
</nav>