var comms = require('../Comms');

var _object = "discover";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "test_events":
			case "filter":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

var Behavior = {
	getInstance: function(session) {
		this.session = session;
      	return this;
  	},
	Recommended: function(params, callback){
		comms.Post(this.session, _object, "recommended", Encode(params), callback);
	},
	Similar: function(params, callback){
		comms.Post(this.session, _object, "similar", Encode(params), callback);
	},
	RecommendedSimilar: function(params, callback){
		comms.Post(this.session, _object, "recommended_similar", Encode(params), callback);
	},
	Popular: function(params, callback){
		comms.Post(this.session, _object, "popular", Encode(params), callback);
	},
	Hot: function(params, callback){
		comms.Post(this.session, _object, "hot", Encode(params), callback);
	},
	UAC: function(params, callback){
		comms.Post(this.session, _object, "uac", Encode(params), callback);
	}
}

module.exports = Behavior;