Masajid.Router.map(function(){
	this.resource('masajid', {path: '/'});
	this.resource('masjid', {path: 'masajid/:masjid_id'});
});

Masajid.MasajidRoute = Ember.Route.extend({
	model: function(){
		return mosques;
	}
});

Masajid.MasjidRoute = Ember.Route.extend({
	model: function(params){
		return mosques.findBy('id', parseInt(params.masjid_id));
	}
});