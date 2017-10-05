var comms = require('../Comms');
var store = require('../Store');

var _object = "discover";

function Discover(session){
	if (!(this instanceof Discover)) {
		return new Discover(session);
	}
	this.session = session;
}

Discover.prototype = {
	next: function(params, callback){
		store.setDefaultUser(this.session, params, "user");
		comms.Post(this.session, _object, "next", this.encode(params), callback);
	},
	recommended: function(params, callback){
		store.setDefaultUser(this.session, params, "user");
		comms.Post(this.session, _object, "recommended", this.encode(params), callback);
	},
	similar: function(params, callback){
		comms.Post(this.session, _object, "similar", this.encode(params), callback);
	},
	recommendedSimilar: function(params, callback){
		store.setDefaultUser(this.session, params, "user");
		comms.Post(this.session, _object, "recommended_similar", this.encode(params), callback);
	},
	popular: function(params, callback){
		comms.Post(this.session, _object, "popular", this.encode(params), callback);
	},
	hot: function(params, callback){
		comms.Post(this.session, _object, "hot", this.encode(params), callback);
	},

	// BETA endpoints
	uac: function(params, callback){
		comms.Post(this.session, _object, "uac", this.encode(params), callback);
	},
	new: function(params, callback){
		comms.Post(this.session, _object, "new", this.encode(params), callback);
	},
	encode: function(params){
		for(var key in params){
			if (params.hasOwnProperty(key)) {
				switch(key){
				case "exclude_items":
				case "filter":
					params[key] = JSON.stringify(params[key]);
					break;
				case "test_events":
					for(var i = 0; i<params[key].length; i++){
						store.setDefaultUser(this.session, params[key][i], "user");
					}
					params[key] = JSON.stringify(params[key]);
					break;
				}
			}
		}
		return params;
	}
}

module.exports = Discover;