var comms = require('../Comms');

var _object = "behavior";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "params":
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
	Create: function(params, callback){
		comms.Post(this.engine, _object, "create", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.engine, _object, "retrieve", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Post(this.engine, _object, "remove", Encode(params), callback);
	},
}

module.exports = Behavior;