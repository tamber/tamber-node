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
	getInstance: function(session) {
		this.session = session;
      	return this;
  	},
	Create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
	
}

module.exports = Behavior;