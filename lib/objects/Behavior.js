var comms = require('../Comms');

var _object = "behavior";

function Behavior(session){
	if (!(this instanceof Behavior)) {
		return new Behavior(session);
	}
	this.session = session;
}

Behavior.prototype = {
	create: function(params, callback){
		comms.Post(this.session, _object, "create", this.encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", this.encode(params), callback);
	},
	encode: function(params){
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
}

module.exports = Behavior;