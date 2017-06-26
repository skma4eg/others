//<![CDATA[
/*
    NAME : MAIN JS FILE
    AUTHOR NAME : Infinyteam
    AUTHOR WEBSITE : www.infinyteam.com
    OUR PORTFOLIO : http://themeforest.net/user/infinyteam/portfolio?ref=infinyteam
*/
( function( $ ) {
    "use strict";
    $( document ).ready( function() {
        // ------------------------------------------------------
        // Print this Article
        // ------------------------------------------------------
        $('.printhis').on('click', function(){
             $(".post.single-post").print();
        });
        // ------------------------------------------------------
        // Is to disable the preloader when the page finish load!
        // ------------------------------------------------------
        $( window ).load( function() {
            setTimeout( function() {
                $( "#loader" ).css( "display", "none" );
            }, 300 );
        } );
        // ------------------------------------------------------
        // Add parent class to navigation parents
        // ------------------------------------------------------
        $( ".mainmenu .menu ul > li > ul" ).parent().addClass( "parent" );
        $( ".mainmenu .menu ul > li.parent" ).hover( function() {
            $( this ).children( ".mainmenu .menu ul > li > ul:not(.megamenu)" ).slideDown( 300 );
        }, function() {
            $( this ).children( ".mainmenu .menu ul > li > ul:not(.megamenu)" ).slideUp( 300 );
        } );
        // ------------------------------------------------------
        // Header Mobile Menu
        // ------------------------------------------------------
        $( ".menu-tigger, .menu-close" ).on( "click", function() {
            $( ".slide-menu" ).toggleClass( "open" );
        } );
        $( '.slide-menu ul li.active' ).addClass( 'open' ).children( 'ul' ).show();
        $( '.slide-menu ul li.has-sub > a' ).on( 'click', function() {
            $( this ).removeAttr( 'href' );
            var element = $( this ).parent( 'li' );
            if ( element.hasClass( 'open' ) ) {
                element.removeClass( 'open' );
                element.find( 'li' ).removeClass( 'open' );
                element.find( 'ul' ).slideUp( 200 );
            } else {
                element.addClass( 'open' );
                element.children( 'ul' ).slideDown( 200 );
                element.siblings( 'li' ).children( 'ul' ).slideUp( 200 );
                element.siblings( 'li' ).removeClass( 'open' );
                element.siblings( 'li' ).find( 'li' ).removeClass( 'open' );
                element.siblings( 'li' ).find( 'ul' ).slideUp( 200 );
            }
        } );
        // ------------------------------------------------------
        // Header Search Toggle
        // ------------------------------------------------------
        $( ".search-tigger,.search-close" ).on( "click", function() {
            $( ".search-modal" ).toggleClass( "open" );
        } );
        // ------------------------------------------------------
        // Sticky Header
        // ------------------------------------------------------
        $( ".mainmenu" ).stickMe();
        // ------------------------------------------------------
        // This is function to activate the Sticky Sidebar Plugin
        // ------------------------------------------------------
        jQuery( "#sidebar" ).theiaStickySidebar( {
            // Settings
            additionalMarginTop: 60
        } );
        // ------------------------------------------------------
        // Activate Match Height Plugin
        // ------------------------------------------------------
        $( ".blog-wrapper" ).each( function() {
            $( this ).children( ".col" ).matchHeight();
        } );
        // ------------------------------------------------------
        // Lazy Load Activated
        // ------------------------------------------------------
        $( "img.lazy" ).unveil( 200, function() {
            $( this ).load( function() {
                this.style.opacity = 1;
            } );
        } );
        // ------------------------------------------------------
        // Scroll To Top
        // ------------------------------------------------------
        $( window ).scroll( function() {
            if ( $( this ).scrollTop() > 100 ) {
                $( ".totop" ).fadeIn();
            } else {
                $( ".totop" ).fadeOut();
            }
        } );
        $( ".totop" ).on('click', function() {
            $( "html, body" ).animate( {
                scrollTop: 0
            }, 600 );
            return false;
        } );
    } );
} )( jQuery );
//]]>