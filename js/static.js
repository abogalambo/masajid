var currentDir = "rtl"
var currentPage = 'home'
function switchDir(dir){
	if(dir != currentDir){
		if(dir == "rtl"){
			var link = $('<link id="rtl-style" rel="stylesheet" href="css/bootstrap-rtl.min.css">')
			$('head').append(link)
			$('.text-left').removeClass('text-left').addClass('text-right')
			currentDir = dir
		}else if(dir == "ltr"){
			$("#rtl-style").remove()
			$('.text-right').removeClass('text-right').addClass('text-left')
			currentDir = dir
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

function showPage(pageID){
  var pID = pageID || window.location.hash;
  $('#' + currentPage).animate({left: '-100%'}, 600);
  $('#' + pID).stop().animate({left:0}, 600);
  currentPage = pID
}