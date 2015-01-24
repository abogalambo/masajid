(function(){
	var app = angular.module('masajid',['uiGmapgoogle-maps', 'ui.router']).
		config(function($stateProvider){
			$stateProvider.state('map', {
				url: "/masajid"
			}).state('map.selected', {
				url: "/:id"
			}).state('add-mosque', {
				url: "/add_mosque"
			}).state('about', {
				url: "/about"
			});
		}).
		config(function(uiGmapGoogleMapApiProvider) {
		    uiGmapGoogleMapApiProvider.configure({
		        //    key: 'your api key',
		        v: '3.17',
		        libraries: 'weather,geometry,visualization'
		    });
		});

	app.controller('PagesController', function($scope, $state){
		this.pages = ["map","add-mosque","about"];
		this.currentDir = 'rtl';
		this.isActive = function(page){
			return this.active === this.pages.indexOf(page);
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
			}else if(dir == "ltr"){
				$("#rtl-style").remove()
				$('.text-right').removeClass('text-right').addClass('text-left')
				this.currentDir = dir
			};
		};
		this.computeStyle = function(page){
			var i = this.pages.indexOf(page);
			var multiplier = 1;
			if(this.currentDir == 'ltr') multiplier = -1;
			return {left: 100 * multiplier * (this.active - i) + "%"}
		}

		var that = this;
	    $scope.$watch(function () { return $state.$current.name; }, function (newVal) {
	    	var matches = that.pages.filter(function(page){
	    		return $state.includes(page);
	    	})
	    	if(matches.length == 0){
	    		that.active = 0;	
	    	}else{
	    		that.active = that.pages.indexOf(matches[0]);
	    	}
		});
	});

	app.controller('MasajidController', function($scope, $state, uiGmapGoogleMapApi){
		this.masajid = mosques;
		this.preview = false;
		this.isActive = function(msq){
			return this.activeMosque && this.activeMosque.id === msq.id;
		};

		this.setActive = function(mosque){
			this.activeMosque = mosque;
			this.preview = true;
			$state.go('map.selected', {id:mosque.id}, {notify:false});
		};

		this.unselect = function(){
			this.activeMosque = undefined;
			this.preview = false;
			$state.go('map', {}, {notify:false});
		};

		this.hidePreview = function(){
			this.preview = false;
		};

		uiGmapGoogleMapApi.then(function(maps) {
			$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		});

		var that = this;
		$scope.$watch(function () { return $state.$current.name; }, function (newVal) {
			if($state.includes("map.selected")){
				var activeId = parseInt($state.params.id);
				var matches = that.masajid.filter(function(msq){
					return msq.id == activeId
				});
				if(matches.length){
					that.setActive(matches[0]);
				}
			}
		});
	});

	app.controller('AddMosqueController', function($scope, $state, uiGmapGoogleMapApi){
		var that = this;
		this.mosque = {lat: 0, lng: 0};
		this.mosques = mosques;
		this.markerDragged = function(marker,eventName,model,args){
			var currentPosition = marker.getPosition();
			that.mosque.lat = currentPosition.lat();
			that.mosque.lng = currentPosition.lng();
		}
		uiGmapGoogleMapApi.then(function(maps) {
			console.log(maps)
			$scope.map = {
				center: { latitude: 0, longitude: 0 },
				events: { click: function(map, eventName, args){
					var position = args[0].latLng;
					that.mosque.lng = position.lng();
					that.mosque.lat = position.lat();
					map.panTo(args[0].latLng)
					$scope.refresh = false;
					$scope.refresh = true;
				}},
				zoom: 3
			};
		});
	});

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
},{
	id: 3,
	name: "Om al mo2meneen",
	lat: "45",
	lng: "-73.4",
	city: "Alexandria",
	size: "big",
	about: "",
	images: []
}];