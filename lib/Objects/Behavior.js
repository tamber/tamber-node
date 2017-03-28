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

function Behavior(session){
	if (!(this instanceof Behavior)) {
		return new Behavior(session);
	}
	this.session = session;
}

Behavior.prototype = {
	create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
	
}

module.exports = Behavior;