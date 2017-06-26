//<![CDATA[

        // ------------------------------------------------------
        // Advanced Post Pagination
        // ------------------------------------------------------
        (function(e) {
            var t = e("a.newer-link");
            var n = e("a.older-link");
            e.get(t.attr("href"), function(n) {
                t.html(
                    '<span class="psub">Next Article</span> <span class="ptitle">' +
                    e(n).find(".post .post-title").text() + "</span>");
            }, "html");
            e.get(n.attr("href"), function(t) {
                n.html(
                    '<span class="psub">Previous Article</span> <span class="ptitle">' +
                    e(t).find(".post .post-title").text() + "</span>");
            }, "html");
        })(jQuery);
        // ------------------------------------------------------
        // Top Menu Navigation
        // ------------------------------------------------------
        var s = -1,
            a = "",
            t = "";
        $(".navmenu .menu").find("ul").find("li").each(function() {
            for (var e = $(this).text(), r = $(this).find("a").attr("href"), i =
                0, l = 0; l < e.length && (i = e.indexOf("_", i), -1 != i); l++)
                i++;
            if (level = l, level > s && (a += "<ul>", t += "<ul>"), level < s) {
                offset = s - level;
                for (var l = 0; l < offset; l++) a += "</ul></li>",
                    t += "</ul></li>"
            }
            e = e.replace(/_/gi, ""), a += "<li><a href='" + r + "'>" + e +
                "</a>", t += "<li><a href='" + r + "'>";
            for (var l = 0; l < level; l++) t += "";
            t += e + "</a>", s = level
        });
        for (var i = 0; s >= i; i++) a += "</ul>", t += "</ul>", 0 != i && (a +=
            "</li>", t += "</li>");
        $(".navmenu .PageList .menu").html(t), $(".navmenu .menu ul li ul").parent("li").addClass(
            "parent"), $(".navmenu .widget .menu").css("display", "block"), $(
            ".open-menu").click(function() {
            return $(".navmenu .menu").slideToggle(), !1
        });

    function blockfeeds(parent, count, label, style) {

        // Image Optimizations
        function opImages(img, size, w, h) {
            return img.replace(size, 'w' + w + '-h' + h + '-c')
        }

        // FEED URL & No Thumb & Months Name Variable
        var furl = "",
            startIndex = Math.floor((Math.random() * count) + 1),
            noThumb = "//3.bp.blogspot.com/-DB4ttXv4Iz8/WJ83ZTz4U3I/AAAAAAAABIU/UKJ-pggs-mwbwjXw-d6jHWCAUVz-M7kPgCK4B/w400-h320/no_image.jpg",
            monthsName = [, "January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // JSON FEED
        if (label !== undefined) {
            if (label.match('recent')) {
                furl = '/feeds/posts/default?alt=json-in-script&max-results=' + count;
            }else if (label.match("random")) {
                furl = '/feeds/posts/default?alt=json-in-script&orderby=updated&start-index=' + startIndex + '&max-results=' + count;
            }else if (label.match('discussed')) {
                furl = '/feeds/posts/default?alt=json-in-script&max-results=9999';
            }else if (!(label.match('random')) || !(label.match('recent')) || !(label.match('discussed')) ) {
                furl = '/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results=' + count;
            }
        }

        // Ajax Load
        if (furl.length > 0) {
            $.ajax({
                type: 'GET',
                url: furl,
      			cache: false,
                dataType: 'jsonp',
                beforeSend: function(){
                	parent.html('<div class="loader-icon"><img src="//2.bp.blogspot.com/-8cFVHrneSRg/WCRQ9S9vJ8I/AAAAAAAAArE/w9NQwaDikg025gOviC7X1Dv17hB5NC6uACPcB/s32/ajax-loader.gif" alt="Loading..."/></div>');
                },
                complete: function(){
                	$('.loader-icon').hide();
                },
                success: function(data) {
                    // First Tag of Block Content
                    var htmlcode= '';
                    switch(style){
                        case 'megamenu':
                          htmlcode += '<div class="megamenu"><div class="item-content">';
                          break;
                        case 'featured1':
                          htmlcode += '<div class="slider layout1">';
                          break;
                        case 'featured2':
                          htmlcode += '<div class="row-gallery layout2">';
                          break;
                        case 'featured3':
                          htmlcode += '<div class="row-gallery layout3">';
                          break;
                        case 'featured4':
                          htmlcode += '<div class="row-gallery layout4">';
                          break;
                        case 'trending':
                          htmlcode += '<div class="slider">';
                          break;
                        case 'block1':
                          htmlcode += '<div class="blog-layout layout-1 has-caption2"><div class="blog-wrapper row">';
                          break;
                        case 'block2':
                          htmlcode += '<div class="blog-layout layout-2"><div class="blog-wrapper row">';
                          break;
                        case 'block3':
                          htmlcode += '<div class="blog-layout layout-3"><div class="blog-wrapper row">';
                          break;
                        case 'block4':
                          htmlcode += '<div class="blog-layout layout-4"><div class="blog-wrapper row">';
                          break;
                        case 'block5':
                          htmlcode += '<div class="blog-layout layout-5 tiny-thumb"><div class="blog-wrapper row">';
                          break;
                        case 'block6':
                          htmlcode += '<div class="blog-layout layout-6 tiny-thumb"><div class="blog-wrapper row">';
                          break;
                        case 'block9':
                          htmlcode += '<div class="blog-layout layout-9 has-gallery"><div class="blog-wrapper row-tiny">';
                          break;
                        case 'block10':
                          htmlcode += '<div class="blog-layout layout-10 has-caption has-slider"><div class="blog-wrapper row"><div class="col col-sm-12">';
                          break;
                        case 'feeds':
                          htmlcode += '<ul class="recent-posts">';
                          break;
                        case 'slider':
                          htmlcode += '<ul class="slider-posts">';
                          break;
                        case 'related':
                          htmlcode += '<div class="content row">';
                          break;
                        case 'recommended':
                          htmlcode += '<div class="content row recom">';
                          break;
                        default:
                          htmlcode += '<ul>';
                          break;
                    }

                    var feedcode = '',
                        link = '',
                        json = data.feed.entry;

                    // Sortby Most Commented
                        if (label.match('discussed')) {
                           var dataLength = count;
                            // Sortby Most Commented
                            function compare(a,b) {
                              return  (b.thr$total.$t- a.thr$total.$t)
                            }
                            data.feed.entry.sort(compare);
                        } else {
                           var dataLength = json.length;
                        }

                    // The Loop
                    for (var i=0; i<dataLength; i++) {

                        // Get link from an array
                        for (var j = 0; j < json[i].link.length; j++) {
                            if (json[i].link[j].rel == "alternate") {
                                link = json[i].link[j].href;
                                break;
                            }
                        }

                        // Get Entry Feeds
                        var title = json[i].title.$t,
                            author = json[i].author[0].name.$t,
                            authorImg = json[i].author[0].gd$image.src,
                            comments = json[i].thr$total.$t,
                            content = json[i].content.$t,
                            $content = $('<div>').html(content),
                            shortSummary = $content.text().substr(0, 110) + '...',
                            longSummary = $content.text().substr(0, 210) + '...';

                        // Get One Category
                      	if ('category' in json[i]) {
                          if (json[i].category[0].term !== undefined) {
                              var tag = json[i].category[0].term;
                          }
                        } else {
                          var tag = 'Uncategorized';
                        }

                        // Get Timeago
                        var getTimeago = json[i].published.$t,
                            ago = '<i class="ify-icon-clock"></i> <time class="timeago" datetime="' + getTimeago + '">' + getTimeago + '</time>';

                        // Get Time Date
                        var getDate = json[i].published.$t,
                            y = getDate.substring(0, 4),
                            m = getDate.substring(5, 7),
                            d = getDate.substring(8, 10),
                            date = monthsName[parseInt(m, 10)] + ' ' + d + ', ' + y;

                        // Get Time Hour
                        var getHour = json[i].published.$t,
                            h = getHour.substring(11, 13),
                            m = getHour.substring(14, 16),
                            time = h + ':' + m;

                        // Get Thumbnail Image as globale
                        if (content.indexOf("<img") !== -1 || content.indexOf("youtube.com/embed") !== -1) {
                            if(json[i].media$thumbnail != undefined) {
                                var src = json[i].media$thumbnail.url;
                            }
                        }

                        // Get Video Format
                        var format = '<span class="post-format"><i class="fa fa-camera"></i></span>';
                        if ($content.find("iframe").length > 0) {
                          var frame_src = $content.find("iframe").attr("src");
                          if(frame_src.match(/youtube.com\/embed|vimeo/gi)) {
                            format = '<span class="post-format"><i class="fa fa-play"></i></span>';
                          }
                          if(frame_src.match(/soundcloud.com\//gi)) {
                            format = '<span class="post-format"><i class="fa fa-volume-up"></i></span>';
                          }
                        }

                        // Optmize Images
						if (authorImg !== undefined) {
                            if (authorImg.match("s113")) {
                                var $authorImg = opImages(authorImg, "s113", 24, 24);
                            }
                            if (authorImg.match("s220")) {
                                var $authorImg = opImages(authorImg, "s220", 24, 24);
                            }
                        }
                        if (src !== undefined) {
                            if (src.match("default.jpg")) {
                                var $src = src.replace(
                                    "/default.jpg",
                                    "/hqdefault.jpg");
                            }
                            switch(style){
                                case 'megamenu':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 204, 135);
                                        }
                                  break;
                                case 'featured1':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 1140, 502);
                                        }
                                  break;
                                case 'featured2':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 502, 502);
                                        }
                                  break;
                                case 'featured3':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 664, 502);
                                            } else {
                                              var $src = opImages(src, "s72", 474, 250);
                                            }
                                        }
                                  break;
                                case 'featured4':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 569, 502);
                                            } else if (i === 3) {
                                              var $src = opImages(src, "s72", 569, 250);
                                            } else {
                                              var $src = opImages(src, "s72", 284, 250);
                                            }
                                        }
                                  break;
                                case 'trending':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 227, 150);
                                        }
                                  break;
                                case 'block1':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 734, 400);
                                            } else {
                                              var $src = opImages(src, "s72", 352, 230);
                                            }
                                        }
                                  break;
                                case 'block2':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 352, 230);
                                        }
                                  break;
                                case 'block3':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 225, 150);
                                        }
                                  break;
                                case 'block4':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 480, 318);
                                            } else {
                                              var $src = opImages(src, "s72", 225, 149);
                                            }
                                        }
                                  break;
                                case 'block5':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 352, 230);
                                            } else {
                                              var $src = opImages(src, "s72", 140, 90);
                                            }
                                        }
                                  break;
                                case 'block6':
                                        if (src.match("s72")) {
                                            if (i === 0) {
                                              var $src = opImages(src, "s72", 295, 195);
                                            } else {
                                              var $src = opImages(src, "s72", 140, 90);
                                            }
                                        }
                                  break;
                                case 'block9':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 182, 182);
                                        }
                                  break;
                                case 'block10':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 734, 522);
                                        }
                                  break;
                                case 'feeds':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 140, 90);
                                        }
                                  break;
                                case 'slider':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 345, 200);
                                        }
                                  break;
                                case 'related':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 360, 230);
                                        }
                                  break;
                                case 'recommended':
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 140, 90);
                                        }
                                  break;
                                default:
                                        if (src.match("s72")) {
                                           var $src = opImages(src, "s72", 90, 70);
                                        }
                                  break;
                            }
                        }

                        // Get First Thumbnail Image if is external & if without Thumbnail
                        if (content.indexOf("<img") === -1 && content.indexOf("youtube.com/embed") === -1) {
                            var $src = $content.find('img:first').attr('src');
                            var $src = noThumb;
                        }

                        // Variables for easy add!
                        var thumb = '<div class="post-thumb"><a href="' + link + '"><img class="lazy" src="https://3.bp.blogspot.com/-NGenkBIMa34/WEyH4J3cWXI/AAAAAAAAA6g/VjT9teL76qsCGgYZWU7LfBC_PxxRWF4swCK4B/s1/placeholder.png" data-src="' 
                        + $src + '" alt="' + title +'"/></a>' + format + '</div>',
							postTitle = '<a href="' + link + '">' + title + '</a>',
                            metaAuthor = '<ul class="post-meta"><li><img style="float:left; margin-right: 8px; border-radius: 50%;" width="24" src="' + $authorImg + '" alt="' + author + '" /> by <strong>' + author + '</strong></li><li>' + date + '</li><li><i class="fa fa-comment-o"></i>' + comments + '</li></ul>',
                            metaPost = '<ul class="post-meta"><li>' + date + '</li><li><i class="fa fa-comment-o"></i>' + comments + '</li></ul>',
                            metaTag = '<div class="post-category"><a href="/search/label/' + tag + '?max-results=12">' + tag + '</a></div>',
                            metaMore = '<a href="' + link + '">Continue Reading</a>',
                            shortSum = '<p class="post-entry">' + shortSummary + '</p>',
                            longSum = '<p class="post-entry">' + longSummary + '</p>';


                        // Block Content
                        switch(style){
                            case 'megamenu':
                                htmlcode += '<div class="item"><div class="post">' + 
                                            thumb + '<div class="post-content">' + 
											metaTag + '<h6 class="post-title">' + 
											postTitle + '</a></h6></div></div></div>';
                              break;
                            case 'featured1':
                                htmlcode += '<div class="item"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h3 class="post-title">' + 
                                                postTitle + '</h3>' + 
												metaPost + '</div></div></div>';
                              break;
                            case 'featured2':
                                htmlcode += '<div class="first col-md-6 col-sm-6"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h3 class="post-title">' + 
                                                postTitle + '</h3>' + 
												metaAuthor + '</div></div></div>';
                              break;
                            case 'featured3':
                                if( i === 0 ){
                                    htmlcode += '<div class="first col-md-7 col-sm-12"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h2 class="post-title">' + 
                                                postTitle + '</h2>' + 
												metaAuthor + '</div></div></div>';
                                } else {
                                    htmlcode += '<div class="col-md-5 col-sm-6"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h4 class="post-title">' + 
                                                postTitle + '</h4></div></div></div>';
								}
                              break;
                            case 'featured4':
                                if( i === 0 ){
                                    htmlcode += '<div class="first col-md-6 col-sm-12"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h3 class="post-title">' + 
                                                postTitle + '</h3>' + 
												metaAuthor + '</div></div></div>';
                                } else if( i === 3 ){
                                    htmlcode += '<div class="col-md-6 col-sm-4"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h4 class="post-title">' + 
                                                postTitle + '</h4></div></div></div>';
                                } else {
                                    htmlcode += '<div class="col-md-3 col-sm-4"><div class="post has-caption" style="background-image: url(' +
                                                $src + ');">' + 
												format + '<div class="post-content">' + 
                                                metaTag + '<h5 class="post-title">' + 
                                                postTitle + '</h5></div></div></div>';
								}
                              break;
                            case 'trending':
                                htmlcode += '<div class="item"><div class="post">' + 
												thumb + '<div class="post-content">' + 
                                                metaTag + '<h2 class="post-title">' + 
                                                postTitle + '</h2></div></div></div>';
                              break;
                            case 'block1':
                                if( i === 0 ){
                                    htmlcode += '<div class="col col-sm-12"><div class="post first">' + 
												thumb + '<div class="post-content">' + 
                                                metaTag + '<h3 class="post-title">' + 
                                                postTitle + '</h3>' + 
                                                longSum + 
                                                metaPost + '</div></div></div>';
                                } else {
                                    htmlcode += '<div class="col col-sm-6"><div class="post">' + 
												thumb + '<div class="post-content"><h5 class="post-title">' + 
                                                postTitle + '</h5>' + 
                                                shortSum + 
                                                metaPost + '</div></div></div>';
								}
                              break;
                            case 'block2':
                                htmlcode += '<div class="col col-sm-6"><div class="post">' + 
												thumb + '<div class="post-content"><h4 class="post-title">' + 
                                                postTitle + '</h4>' + 
                                                shortSum + 
                                                metaPost + '</div></div></div>';
                              break;
                            case 'block3':
                                htmlcode += '<div class="col col-sm-4 col-xs-12"><div class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
                                                metaPost + '</div></div></div>';
                              break;
                            case 'block4':
                                if( i === 0 ){
                                    htmlcode += '<div class="col col-sm-8"><div class="post first">' + 
												thumb + '<div class="post-content">' + 
                                                metaTag + '<h4 class="post-title">' + 
                                                postTitle + '</h4>' + 
                                                shortSum + 
                                                metaPost + '</div></div></div>';
                                } else {
                                    htmlcode += '<div class="col col-sm-4 col-xs-12"><div class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
												metaPost + '</div></div></div>';
								}
                              break;
                            case 'block5':
                                if( i === 0 ){
                                    htmlcode += '<div class="col col-sm-6"><div class="post first">' + 
												thumb + '<div class="post-content"><h5 class="post-title">' + 
                                                postTitle + '</h5>' + 
                                                longSum + 
                                                metaPost + '</div></div></div>';
                                } else {
                                    htmlcode += '<div class="col col-sm-6"><div class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
												metaPost + '</div></div></div>';
								}
                              break;
                            case 'block6':
                                if( i === 0 ){
                                    htmlcode += '<div class="col col-sm-12"><div class="post first">' + 
												thumb + '<div class="post-content"><h5 class="post-title">' + 
                                                postTitle + '</h5>' + 
                                                longSum + 
                                                metaPost + '</div></div></div>';
                                } else {
                                    htmlcode += '<div class="col col-sm-6"><div class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
												metaPost + '</div></div></div>';
								}
                              break;
                            case 'block9':
                                htmlcode += '<div class="col col-sm-3 col-xs-12"><div class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6></div></div></div>';
                              break;
                            case 'block10':
                                htmlcode += '<div class="post">' + 
												thumb + '<div class="post-content">' + 
												metaTag + '<h4 class="post-title">' + 
                                                postTitle + '</h4>' + 
                                                metaPost + '</div></div>';
                              break;
                            case 'slider':
                                htmlcode += '<li class="post">' + 
                                                thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
                                                metaPost + '</div></li>';
                              break;
                            case 'feeds':
                                htmlcode += '<li class="post">' + 
                                                thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
                                                metaPost + '</div></li>';
                              break;
                            case 'related':
                                htmlcode += '<div class="col col-sm-4 col-xs-12"><article class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
												metaPost + '</div></article></div>';
                              break;
                            case 'recommended':
                                htmlcode += '<div class="col col-sm-6"><article class="post">' + 
												thumb + '<div class="post-content"><h6 class="post-title">' + 
                                                postTitle + '</h6>' + 
												metaPost + '</div></article></div>';
                              break;
                            default:
                                htmlcode += '<span class="error-loading">Oops! Something wrong here, you may have write a wrong style! the Block Content Styles is sensitive to the letters and spaces! be careful when you write styles, this is an example of a correct structure : <span>3/featured/recent</span>, all letters should be lowercase! if this widget still not work, please send us an email to our customer support to get in touch to you ASAP!</span>';
                              break;
                        }

                    }

                    feedcode += '</ul>';
                    htmlcode += feedcode;

                    switch(style){
                        case 'featured1':
                          htmlcode += '</div><div id="featuredNav" class="slider-nav"></div>';
                          break;
                        case 'featured2 || featured3 || featured4':
                          htmlcode += '</div>';
                          break;
                        case 'trending':
                          htmlcode += '</div><div id="trendNav" class="slider-nav"></div>';
                          break;
                        case 'megamenu || block1 || block2 || block3 || block4 || block5 || block6 || block7 || block8 || block9':
                          htmlcode += '</div></div>';
                          break;
                        case 'block10':
                          htmlcode += '</div><div id="blockNav" class="slider-nav"></div></div></div>';
                          break;
                        case 'slider':
                          htmlcode += '</ul><div id="sliderNav" class="slider-nav"></div>';
                          break;
                        case 'related':
                          htmlcode += '</div>';
                          break;
                        case 'recommended':
                          htmlcode += '</div>';
                          break;
                        default:
                          htmlcode += '</ul>';
                          break;
                    }

                    // Print The Resultsa s HTML
                      parent.html(htmlcode);

                    // ------------------------------------------------------
                    // Unwrap MegaMenu
                    // ------------------------------------------------------
                      $( ".navmenu .PageList ul > li > ul > li a div.megamenu" ).unwrap();
                      $( ".navmenu .PageList ul > li > ul > li div.megamenu" ).unwrap();
                      $( ".navmenu .PageList ul > li > ul div.megamenu" ).unwrap();

                    // ------------------------------------------------------
                    // Feautred Layout One Slider Activated
                    // ------------------------------------------------------
                    var featuredSlider = $( ".featured-posts .slider" );
                    featuredSlider.owlCarousel( {
                        items: 1,
                        loop: true,
                        rtl: true,
                        autoplay: true,
                        smartSpeed: 500,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        nav: true,
                        navContainer: '#featuredNav',
                        navText: [ '', '' ],
                        dots: true,
                        margin: 0,
                        responsiveClass: true
                    } );
                    // ------------------------------------------------------
                    // Trending Posts Slider Activated
                    // ------------------------------------------------------
                    var trendingSlider = $( ".trending-posts .slider" );
                    trendingSlider.owlCarousel( {
                        items: 5,
                        loop: true,
                        rtl: true,
                        autoplay: true,
                        smartSpeed: 500,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        nav: true,
                        navContainer: '#trendNav',
                        navText: [ '', '' ],
                        dots: false,
                        margin: 2,
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                            480: {
                                items: 3
                            },
                            768: {
                                items: 4
                            },
                            992: {
                                items: 5
                            }
                        }
                    } );
                    // ------------------------------------------------------
                    // Blog Layout Has Slider Activated
                    // ------------------------------------------------------
                    var layoutSlider = $( ".has-slider .col" );
                    layoutSlider.owlCarousel( {
                        items: 1,
                        loop: true,
                        rtl: true,
                        autoplay: true,
                        smartSpeed: 500,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        nav: true,
                        navContainer: '#blockNav',
                        navText: [ '', '' ],
                        dots: true,
                        margin: 5,
                        responsiveClass: true
                    } );
                    // ------------------------------------------------------
                    // Slider Posts Widget Activated
                    // ------------------------------------------------------
                    var postsSlider = $( ".slider-posts" );
                    postsSlider.owlCarousel( {
                        items: 1,
                        loop: true,
                        rtl: true,
                        autoplay: true,
                        smartSpeed: 500,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        nav: true,
                        navContainer: '#sliderNav',
                        navText: [ '', '' ],
                        dots: true,
                        margin: 0,
                        responsiveClass: true
                    } );
                    // ------------------------------------------------------
                    // Unveil Plugin Activated
                    // ------------------------------------------------------
                        $("img.lazy").unveil(10, function() {
                          $(this).load(function() {
                            this.style.opacity = 1;
                          });
                        });

                },
                error: function() {
                    parent.html('Error Loading Feeds! Maybe this post is uncategorized! please make sure your post has at least one category.');
                }
            });
        }
    };

  		// Activate Ajax Feeds
        $(".navmenu .PageList ul > li > a,.featured-posts .widget-content,.trending-posts .widget-content,.home-builder .HTML .widget-content,.sidebar .HTML .widget-content,.footer-col .HTML .widget-content,.related,.recommended").each(function() {
            var $this = $(this),
                sp = $this.text().split("/");

                if(!isNaN(sp[0])){
                  var count = sp[0],
                      style = sp[1],
                      label = sp[2];

                  blockfeeds($this, count, label, style);
                }
        });
        // ------------------------------------------------------
        // Post Snippet Excrept
        // ------------------------------------------------------
        $('.long-snippet').each(function(){
          var txt = $(this).text();
          $(this).text(txt.substr(0, 150).replace(/[?,!\.-:;]*$/, '...'));
        });
        // ------------------------------------------------------
        // Wrap Elements for Sidebar Widget Title
        // ------------------------------------------------------
        $('.widget').each(function() {
            $(this).find("h2").wrapAll(
                '<div class="widget-title" />');
        });
        $('.comments').each(function() {
            $(this).find("h4").wrapAll(
                '<div class="widget-title" />');
        });
        // ------------------------------------------------------
        // Instagram Feed
        // ------------------------------------------------------
        function instafeeds(parent, count, token) {
            // Ajax Load
            $.ajax({
                type: 'GET',
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token + '&count=' + count,
                cache: false,
                dataType: 'jsonp',
                success: function(insta) {

                    // First Tag of Block Content
                    var htmlcode= '<div class="instagram-feeds row-gallery">';
                    // The Loop
                    for (var i=0; i<insta.data.length; i++) {
                      var thumb = insta.data[i].images.thumbnail.url,
              link = insta.data[i].link;
            htmlcode +='<a class="col-sm-3 col-xs-3" href="' + link + '"><img src="' + thumb + '" /></a>'

                    }
                    htmlcode += '</div>';
                    // Print The Results as HTML
                      parent.html(htmlcode);

                },
                error: function() {
                    parent.html('Error Loading Images! Maybe this token is invalid.');
                }
            });
        };
        $(".sidebar .HTML .widget-content,.instagram-gallery .widget-content,.footer-col .HTML .widget-content").each(function() {
          var $this = $(this),
              sp = $this.text().split("/"),
              widgetType = sp[0],
              count = sp[1],
              token = sp[2];
          if(widgetType.replace(/\s/g, '') == "instagram"){
            instafeeds($this, count, token);
          }
        });
        // ------------------------------------------------------
        // Optimize Images
        // ------------------------------------------------------
        $(".popular-posts img").attr('src', function(i, src) {
            return src.replace('w72-h72-p-k-no-nu', 'w345-h200-c-k-no');
        });
        $(".widget.Image a img,.widget.FeaturedPost img").attr('src', function(i, src) {
            return src.replace('s1600', 'w345-h245-c');
        });
        $(".avatar-image-container img").attr('src', function(i, src) {
            return src.replace('s35', 's60');
        });
        $(".avatar-image-container img").attr('src', function(i, src) {
            return src.replace('//img1.blogblog.com/img/blank.gif',
                '//3.bp.blogspot.com/-fgwrcZWeRrU/V26tvNcGtsI/AAAAAAAAAG4/lGwGnQDZsNY7bAPr8hVorZruD-jHHxxOgCLcB/s60/anonyme.png'
            );
        });
        // ------------------------------------------------------
        // Wrap Elements for Popular Posts Sidebar Widget
        // ------------------------------------------------------
        $('.popular-posts li').each(function() {
            $(this).find(".item-title, .item-snippet").wrapAll(
                '<div class="item-caption" />');
        });
        // ------------------------------------------------------
        // Post Layouts
        // ------------------------------------------------------
        $(".post .single").each(function() {
            var $this = $(this),
                content = $this.find("*"),
                noSidebar = "[no-sidebar]",
                rightSidebar = "[right-sidebar]",
                leftSidebar = "[left-sidebar]";
            content.replaceText(noSidebar,
                "<style>#main {width: 100%;padding-right: 0;}#sidebar {display:none;}</style>"
            );
            content.replaceText(rightSidebar,
                "<style>#main {float: left !important;}#sidebar {float:right;padding-left: 30px !important;padding-right:15px !important;}</style>"
            );
            content.replaceText(leftSidebar,
                "<style>#main {float: right !important;}#sidebar {float:left;padding-right: 30px !important;padding-left:15px !important;}</style>"
            );
        });

        // ------------------------------------------------------
        // Contact Page
        // ------------------------------------------------------
        $(".post.single-post").each(function() {
            var $this = $(this),
                content = $this.find("*"),
                contactForm = "[contact-form]";
                content.replaceText(contactForm,
                    '<div class="contact-form"><form name="contact-form"><p class="contact-form-name"><label for="name">Your Name <span class="required">(required*)</span></label><input class="contact-form-name" id="ContactForm1_contact-form-name" name="name" size="30" value="" type="text" /></p><p class="contact-form-email"><label for="email">Your Adresse Email <span class="required">(required*)</span></label><input class="contact-form-email" id="ContactForm1_contact-form-email" name="email" size="30" value="" type="text" /></p><p class="contact-form-message"><label for="message">Your Message <span class="required">(required*)</span></label><textarea class="contact-form-email-message"  id="ContactForm1_contact-form-email-message" name="email-message" cols="25" rows="5"></textarea></p><p class="contact-form-submit"><input class="contact-form-button contact-form-button-submit" id="ContactForm1_contact-form-submit" value="Send Message" type="button" /></p><div class="contact-notifications"><p class="contact-form-error-message" id="ContactForm1_contact-form-error-message"></p><p class="contact-form-success-message" id="ContactForm1_contact-form-success-message"></p></div></form></div>'
                );
        });
        // ------------------------------------------------------
        // Post Advertisement
        // ------------------------------------------------------
        $('.post-body *').replaceText(/(\(post_ads\))/g, '<div class="inner-ads"></div>');
        $('.inner-ads').append($('#HTML50').html());
        $('#HTML50').remove();
        // ------------------------------------------------------
        // Comments Expand
        // ------------------------------------------------------
        $('.expand-toggle').on('click', function(){
          $('.expand-content').slideToggle(500);
        })
        // ------------------------------------------------------
        // Post Load More
        // ------------------------------------------------------
        var olderLink = $('a.blog-pager-older-link').attr("href");
        if (olderLink)
          $('.loadMorePosts').show();
          $('.loadMorePosts').on('click', function(){
            $('.loadMorePosts').hide();
            $.ajax({
              url: olderLink,
              success: function(html){
                var res = $(html).find('.blog-posts .blog-wrapper');
                res.children(".status-msg-wrap").remove();
                $('.blog-posts .blog-wrapper').append(res.html());
                olderLink = $(html).find('.blog-pager-older-link').attr("href");
                if (olderLink)
                  $('.loadMorePosts').show();
				else
                  $('#postsloaded').show();
				
                  // ------------------------------------------------------
                  // Unveil Plugin Activated
                  // ------------------------------------------------------
                    $("img.lazy").unveil(10, function() {
                      $(this).load(function() {
                        this.style.opacity = 1;
                      });
                    });
                  // ------------------------------------------------------
                  // Post Excrept
                  // ------------------------------------------------------
                    $('.long-snippet').each(function(){
                      var txt = $(this).text();
                      $(this).text(txt.substr(0, 150).replace(/[?,!\.-:;]*$/, '...'));
                    });
                  // ------------------------------------------------------
                  // Activate Match Height Plugin
                  // ------------------------------------------------------
                  $( ".blog-wrapper" ).each( function() {
                      $( this ).children( ".col" ).matchHeight();
                  } );
              },
              beforeSend: function() {
                $('#moreloader').show();
              },
              complete: function() {
                $('#moreloader').hide();
              }
            });
          })

//]]>