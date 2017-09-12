var comms = require('../Comms');

var _object = "discover";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "test_events":
			case "exclude_items":
			case "filter":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

function Discover(session){
	if (!(this instanceof Discover)) {
		return new Discover(session);
	}
	this.session = session;
}

Discover.prototype = {
	recommended: function(params, callback){
		comms.Post(this.session, _object, "recommended", Encode(params), callback);
	},
	similar: function(params, callback){
		comms.Post(this.session, _object, "similar", Encode(params), callback);
	},
	recommendedSimilar: function(params, callback){
		comms.Post(this.session, _object, "recommended_similar", Encode(params), callback);
	},
	popular: function(params, callback){
		comms.Post(this.session, _object, "popular", Encode(params), callback);
	},
	hot: function(params, callback){
		comms.Post(this.session, _object, "hot", Encode(params), callback);
	},
	// BETA endpoints
	next: function(params, callback){
		comms.Post(this.session, _object, "next", Encode(params), callback);
	},
	uac: function(params, callback){
		comms.Post(this.session, _object, "uac", Encode(params), callback);
	},
	new: function(params, callback){
		comms.Post(this.session, _object, "new", Encode(params), callback);
	}
}

module.exports = Discover;