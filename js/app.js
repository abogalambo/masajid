(function(){
	var app = angular.module('masajid',['uiGmapgoogle-maps']);

	app.controller('PagesController', function(){
		this.pages = ["home","add-mosque","about"];
		this.currentDir = 'rtl';
		this.active = 0;
		this.isActive = function(page){
			return this.active === this.pages.indexOf(page);
		};
		this.initPages = function(){
			var multiplier = 1;
			if(this.currentDir == 'ltr') multiplier = -1;
			for(var i=0; i< this.pages.length; i++){
				$("#" + this.pages[i]).css('left', (i* -100 * multiplier) + "%");
			}
		}
		this.initPages();
		this.goTo = function(page){
			var index = this.pages.indexOf(page);
			if(index == -1) return;
			var multiplier = 1;
			if(this.currentDir == 'ltr') multiplier = -1;
			for(var i=0; i< this.pages.length; i++){
				$("#" + this.pages[i]).animate({left: 100 * multiplier * (index - i) + "%"});
			}
			this.active = index;
		};
		this.toggleDir = function(){
			if(this.currentDir == 'rtl'){
				this.switchDir('ltr');
			}else if(this.currentDir == 'ltr'){
				this.switchDir('rtl');
			};
		};
		this.switchDir = function(dir){
			if(dir == this.currentDir) return;
			if(dir == "rtl"){
				var link = $('<link id="rtl-style" rel="stylesheet" href="css/bootstrap-rtl.min.css">')
				$('head').append(link)
				$('.text-left').removeClass('text-left').addClass('text-right')
				this.currentDir = dir
				this.initPages();
			}else if(dir == "ltr"){
				$("#rtl-style").remove()
				$('.text-right').removeClass('text-right').addClass('text-left')
				this.currentDir = dir
				this.initPages();
			};
		};
	});

	app.controller('MasajidController', function($scope, uiGmapGoogleMapApi){
		this.masajid = mosques;
		this.masjidInfo = false;
		this.isActive = function(id){
			return this.activeMosque && this.activeMosque.id === id;
		};
		this.setActive = function(mosque){
			this.activeMosque = mosque;
			this.masjidInfo = true;
		};

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		});
	});

	app.config(function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        //    key: 'your api key',
	        v: '3.17',
	        libraries: 'weather,geometry,visualization'
	    });
	})
})();

mosques = [{
	id: 1,
	name: "Qaed Ibrahim",
	lat: "45",
	lng: "-73",
	city: "Alexandria",
	size: "big",
	about: "A landmark of Alexandria",
	images: []
},{
	id: 2,
	name: "Hatem Mosque",
	lat: "45.2",
	lng: "-73",
	city: "Alexandria",
	size: "big",
	about: "Old mosque in Smooha",
	images: []
}];