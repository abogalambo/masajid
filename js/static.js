var currentDir = "rtl"
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