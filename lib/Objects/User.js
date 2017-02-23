var comms = require('../Comms');

var _object = "user";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "get_recs":
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
	getInstance: function(pkey, ekey, client) {
		this.session = {
			ProjectKey: pkey,
			EngineKey : ekey, 
			Client : client,
		}
      	return this;
  	},
	Create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	Update: function(params, callback){
		comms.Post(this.session, _object, "update", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
}

module.exports = User;