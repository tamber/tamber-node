var comms = require('../Comms');

var _object = "discover";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "filters":
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
		comms.Post(this.engine, _object, "getRecommended", Encode(params), callback);
	},
	Similar: function(params, callback){
		comms.Post(this.engine, _object, "getSimilar", Encode(params), callback);
	},
	RecommendedSimilar: function(params, callback){
		comms.Post(this.engine, _object, "getRecommendedSimilar", Encode(params), callback);
	},
	Popular: function(params, callback){
		comms.Post(this.engine, _object, "getPopular", Encode(params), callback);
	},
	Hot: function(params, callback){
		comms.Post(this.engine, _object, "getHot", Encode(params), callback);
	},
}

module.exports = Behavior;