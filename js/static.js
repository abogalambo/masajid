var currentDir = "rtl"
var currentPage = 'home'
var pages = ["home","add","about", "thanks"];
function switchDir(dir){
	if(dir != currentDir){
		if(dir == "rtl"){
			var link = $('<link id="rtl-style" rel="stylesheet" href="css/bootstrap-rtl.min.css">')
			$('head').append(link)
			$('.text-left').removeClass('text-left').addClass('text-right')
			currentDir = dir
			initPages();
		}else if(dir == "ltr"){
			$("#rtl-style").remove()
			$('.text-right').removeClass('text-right').addClass('text-left')
			currentDir = dir
			initPages();
		}
	}
}

function toggleMosque(){
	$("#main-map").toggleClass("col-md-12").toggleClass("col-md-8")
	$('.mosque-data').toggleClass('hide-it');
}

$("#main-map").click(function(){
	toggleMosque();
});

function initPages(){
	var multiplier = 1;
	if(currentDir == 'ltr') multiplier = -1;
	for(var i=0; i< pages.length; i++){
		$("#" + pages[i]).css('left', (i* -100 * multiplier) + "%");
	}
}
initPages();

$(window).on('hashchange',function(e){ 
    // $('h1').text(location.hash.slice(1));
    showPage(location.hash.slice(5));
    return false;
});

function showPage(pID){
	var index = pages.indexOf(pID);
	if(index == -1) return;
	var multiplier = 1;
	if(currentDir == 'ltr') multiplier = -1;
	for(var i=0; i< pages.length; i++){
		$("#" + pages[i]).animate({left: 100 * multiplier * (index - i) + "%"});
	}
	// $('#' + currentPage).animate({left: '-100%'}, 600);
	// $('#' + pID).stop().animate({left:0}, 600);
	currentPage = pID
}