$(document).ready(function() {

	var feed = new Instafeed({
        get: 'tagged',
        tagName: 'streetmicrodocs',
        clientId: '54eaeed855e0409ab7460814bae92ae0',
        template: '<div class="thumb-video" data-src="{{model.videos.standard_resolution.url}}"><img src="{{image}}" alt="{{caption}}" /><div class="caption inative"><div class="icons"><span class="likes" title="Likes">{{likes}}</span><span class="comments" title="Comments">{{comments}}</span></div><h1>Street MicroDocs</h1><p class="text-image capt">{{caption}}</p><span class="play"></span></div></div>',
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
    	}else{
    		$("header").removeClass('small');
            $(".svg-logo").removeClass('mini').addClass('big');
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
});

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
}