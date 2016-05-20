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
	getInstance: function(key, client) {
		this.engine = {
			Key : key, 
			Client : client,
		}
      	return this;
  	},
	Recommended: function(params, callback){
		comms.Get(this.engine, _object, "recommended", Encode(params), callback);
	},
	Similar: function(params, callback){
		comms.Get(this.engine, _object, "similar", Encode(params), callback);
	},
	RecommendedSimilar: function(params, callback){
		comms.Get(this.engine, _object, "recommendedSimilar", Encode(params), callback);
	},
	Popular: function(params, callback){
		comms.Get(this.engine, _object, "popular", Encode(params), callback);
	},
	Hot: function(params, callback){
		comms.Get(this.engine, _object, "hot", Encode(params), callback);
	},
}

module.exports = Behavior;