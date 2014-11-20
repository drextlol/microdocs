$(document).ready(function() {

	var feed = new Instafeed({
        get: 'user',
        userId: 1028760904,
        accessToken: '1028760904.5b9e1e6.8361bb9e8a01490780e0e08ee61f12b1',
        template: '<div class="thumb-video" data-src="{{model.videos.standard_resolution.url}}" data-likes="{{likes}}" data-comments="{{comments}}" data-poster="{{model.images.standard_resolution.url}}" data-description="{{caption}}"><img src="{{image}}" alt="{{caption}}" /><div class="caption inative"><div class="icons"><span class="likes" title="Likes">{{likes}}</span><span class="comments" title="Comments">{{comments}}</span></div><h1>StreetMicroDocs</h1><p class="text-image capt">{{caption}}</p><span class="play"></span></div></div>',
        resolution: 'low_resolution',
        limit: 12,
        before: function(){
        	$(".loading").removeClass('inative').addClass('active');
        },
        after: function(){
        	init();
        }
    });
    feed.run();

    var documentHeight;

    $(document).scroll(function(event) {
    	documentHeight = ($(document).height() - $(window).height());

    	if($(document).scrollTop() >= documentHeight){
    		if(!$(".ctn-content").hasClass('filtrando')){
                feed.next();
            }
    	}

    	if($(document).scrollTop() >= 300){
            $("header").addClass('small');
            $("header .small-3").removeClass('small-3').addClass('small-2');
            $("header .small-7").removeClass('small-7').addClass('small-8');
            $(".svg-logo").removeClass('big').addClass('mini');
            $(".menu").removeClass('big').addClass('mini');
    	}else{
    		$("header").removeClass('small');
            $("header > div").eq(0).removeClass('small-2').addClass('small-3');
            $("header .small-8").removeClass('small-8').addClass('small-7');
            $(".svg-logo").removeClass('mini').addClass('big');
            $(".menu").removeClass('mini').addClass('big');
    	}

        if($(".menu").find('.ctn-menu.active')){
            $('.ctn-menu.active').removeClass('active').addClass('hidden');
            $(".ctn-search").removeClass('hidden');
        }
    });
    
    $(document).on("input paste", ".search", function(e) {
        if($(this).val() != ""){
            if(!$(".ctn-content").hasClass('filtrando')){
                $(".ctn-content").addClass('filtrando');
            }
        }else{
            $(".ctn-content").removeClass('filtrando');
        }

        if($(".list > *").size() == ""){
            if($(".not-found").size() == 0){
                $(".ctn-content.filtrando").append('<img src="images/not-found.png" class="not-found" alt="Try Again">');
            }
        }else{
            $(".not-found").remove();
        }

    });

    modalStyle();

    if($(window).width() <= 770){
        $("body").addClass('tpl-mobile');
    }else{
        $("body").removeClass('tpl-mobile');
    }
        mouseOverThumb();

    $(".logo").on('click',function(event) {
    	event.preventDefault();

    	$("body").animate({
    		"scrollTop": 0
    	}, 1000);
    });

    $(".menu").on('click', function(event) {
    	event.preventDefault();
    	/* Act on the event */
    });

    $(".lnk-menu").on('click', function(event) {
        event.preventDefault();

        $(this).closest('li').find('.ctn-menu').removeClass('hidden').addClass('active');
        $(".ctn-search").addClass('hidden');
    });

    $(".close").on('click', function(event) {
        event.preventDefault();

        $(this).closest('.ctn-menu').removeClass('active').addClass('hidden');
        $(".ctn-search").removeClass('hidden');
    });

    $(".sr-mobile").on('click', function(event) {
        event.preventDefault();

        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(".sr-mobile img").attr("src", "images/close-search.png");

            $(".bg-search").animate({
                "height": "66px",
                "padding": "10px 0"
            }, 100);

            $(".ctn-content").animate({
                "margin-top": "145px"
            }, 500);
        }else{
            $(this).removeClass('active');
            $(".sr-mobile img").attr("src", "images/search.png");

            $(".bg-search").animate({
                "height": "0",
                "padding": "0"
            }, 100);

            $(".ctn-content").animate({
                "margin-top": "85px"
            }, 500);
        }
    });

    $(".menu-link > a").on('mouseover', function(event) {
        event.preventDefault();
        
        $(".menu-link > a").addClass('nover');
        $(this).removeClass('nover').addClass('hover');
    }).mouseleave(function(event) {
        $(".menu-link > a").removeClass('nover hover')
    });

    $(".menu-link > a").on('click', function(event) {
        event.preventDefault();
        
        var clickDiv = $(this).data("text");

        $(".menu-link > div").addClass('hidden');
        $(".menu-link").find(clickDiv).removeClass('hidden');
    });

    $(".close-menu").on('click', function(event) {
        event.preventDefault();
        
        $(".box-menu").addClass('hide');
        $("body").removeClass('overflow');
        $(".menu-link > div").removeClass('hidden').addClass('hidden');
    });

    $(".menu, .menu-mobile").on('click', function(event) {
        event.preventDefault();
        
        $("body").addClass('overflow');
        $(".box-menu").removeClass('hide');
    });
});
// Fim document

$(window).resize(function(event) {
    modalStyle();

    if($(window).width() <= 770){
         $("body").addClass('tpl-mobile');
         mouseOverThumb();
     }else{
         $("body").removeClass('tpl-mobile');
         mouseOverThumb();
     }
});

$(window).keydown(function(e) {
    if(e.keyCode == 27){
        closeMovie();
    }
});

$(".movie-mask").on('click', function(event) {
    var ckObj = event.target.className;
    if(ckObj == "movie-mask"){
        closeMovie();
    }
});

$(".close-modal").on('click', function(event) {
    event.preventDefault();
    closeMovie();
});

function modalStyle(){
    if($(window).width() <= 977){
        $(".movie-modal.normal").addClass('hidden');
        $(".movie-modal.mobile").removeClass('hidden');
    }else{
        $(".movie-modal.normal").removeClass('hidden');
        $(".movie-modal.mobile").addClass('hidden');
    }
}

function closeMovie(){
    $(".mv-media .mv-lnk").each(function(){
        $(this)[0].pause();
    });

    $(".movie-mask").addClass('hidden');
    $("html, body").removeClass('overflow');
}

function mouseOverThumb(){
    if(!$("body").hasClass('tpl-mobile')){
        $(".thumb-video").on("mouseover", function(event) {
            $(".thumb-video").addClass('opacity');
            $(this).find(".caption").removeClass('inative').addClass('active');
            $(this).removeClass('opacity');
        }).mouseleave(function(event) {
            $(".thumb-video").removeClass('opacity');
            $(this).find(".caption").removeClass('active').addClass('inative');
        });
    }else{
        $(".thumb-video").on("mouseover", function(event) {
            $(".thumb-video").removeClass('opacity');
            $(this).find(".caption").removeClass('active').addClass('inative');
        });
    }
}

function init(){

	setTimeout(function(){
		$(".thumb-video").css("opacity", 1);
		$(".loading").addClass('inative').removeClass('active');
	}, 300);

    mouseOverThumb();

    var options = {
	  valueNames: ['capt'],
      indexAsync: true
	};

	var userList = new List('page', options);

    var dadosMovie, positionScroll;

    $(".thumb-video").on('click', function(event) {
        event.preventDefault();

        dadosMovie = {
            "videoUrl": $(this).data("src"),
            "posterUrl": $(this).data("poster"),
            "commentsQtd": $(this).data("comments"),
            "likesQtd": $(this).data("likes"),
            "captionText": $(this).data("description")
        }

        $("html, body").addClass('overflow');
        $(".movie-mask .mv-lnk").attr("poster", dadosMovie.posterUrl);
        $(".movie-mask .mv-src").attr("src", dadosMovie.videoUrl);
        $(".movie-mask .mv-lnk").attr({"preload":"auto", "autoplay": false});
        $(".movie-mask .mv-likes").text(dadosMovie.likesQtd);
        $(".movie-mask .mv-comments").text(dadosMovie.commentsQtd);
        $(".movie-mask .mv-description").text(dadosMovie.captionText);
        $(".movie-mask").removeClass('hidden');
        $(".movie-mask .mv-lnk").load();
    });
}