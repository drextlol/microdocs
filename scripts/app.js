$(document).ready(function() {

	var feed = new Instafeed({
        get: 'tagged',
        tagName: 'streetmicrodocs',
        clientId: 'ba936763da8c47108329a3583b90b840',
        template: '<div class="thumb-video" data-src="{{model.videos.standard_resolution.url}}" data-likes="{{likes}}" data-comments="{{comments}}" data-poster="{{model.images.standard_resolution.url}}" data-description="{{caption}}"><img src="{{image}}" alt="{{caption}}" /><div class="caption inative"><div class="icons"><span class="likes" title="Likes">{{likes}}</span><span class="comments" title="Comments">{{comments}}</span></div><h1>Street MicroDocs</h1><p class="text-image capt">{{caption}}</p><span class="play"></span></div></div>',
        resolution: 'low_resolution',
        limit: 12,
        sortBy: "random",
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
    		feed.next();
    	}

    	if($(document).scrollTop() >= 300){
    		$("header").addClass('small');
            $(".svg-logo").removeClass('big').addClass('mini');
            $(".menu").removeClass('big').addClass('mini');
    	}else{
    		$("header").removeClass('small');
            $(".svg-logo").removeClass('mini').addClass('big');
            $(".menu").removeClass('mini').addClass('big');
    	}

        if($(".menu").find('.ctn-menu.active')){
            $('.ctn-menu.active').removeClass('active').addClass('hidden');
            $(".ctn-search").removeClass('hidden');
        }

    });

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

function closeMovie(){
    $(".mv-media .mv-lnk").each(function(){
        $(this)[0].pause();
    });

    $(".movie-mask").addClass('hidden');
    $("body").removeClass('overflow');
}

function init(){

	setTimeout(function(){
		$(".thumb-video").css("opacity", 1);
		$(".loading").addClass('inative').removeClass('active');
	}, 300);


	$(".thumb-video").on("mouseover", function(event) {
		$(".thumb-video").addClass('opacity');
    	$(this).find(".caption").removeClass('inative').addClass('active');
    	$(this).removeClass('opacity');
    }).mouseleave(function(event) {
    	$(".thumb-video").removeClass('opacity');
    	$(this).find(".caption").removeClass('active').addClass('inative');
    });

    var options = {
	  valueNames: ['capt']
	};

	var userList = new List('page', options);

    var dadosMovie;

    $(".thumb-video").on('click', function(event) {
        event.preventDefault();
        
        dadosMovie = {
            "videoUrl": $(this).data("src"),
            "posterUrl": $(this).data("poster"),
            "commentsQtd": $(this).data("comments"),
            "likesQtd": $(this).data("likes"),
            "captionText": $(this).data("description")
        }

        $("body").addClass('overflow');
        $(".movie-mask .mv-lnk").attr("poster", dadosMovie.posterUrl);
        $(".movie-mask .mv-src").attr("src", dadosMovie.videoUrl);
        $(".movie-mask .mv-lnk").load();
        $(".movie-mask .mv-lnk").attr({"preload":"auto", "autoplay": true});
        $(".movie-mask .mv-likes").text(dadosMovie.likesQtd);
        $(".movie-mask .mv-comments").text(dadosMovie.commentsQtd);
        $(".movie-mask .mv-description").text(dadosMovie.captionText);
        $(".movie-mask").removeClass('hidden');
    });
}