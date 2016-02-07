var comms = require('../Comms');

var _object = "user";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "getRecs":
			case "events":
			case "metadata":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

var User = {
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
	Update: function(params, callback){
		comms.Post(this.engine, _object, "update", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.engine, _object, "retrieve", Encode(params), callback);
	},
}

module.exports = User;