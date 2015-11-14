var comms = require('../Comms');

var _object = "actor";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "behaviors":
				params[key] = JSON.stringify(params[key]);
				break;
			case "getRecs":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

var Actor = {
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
	AddBehaviors: function(params, callback){
		comms.Post(this.engine, _object, "addBehaviors",Encode(params), callback);
	},
	RemoveBehaviors: function(params, callback){
		comms.Post(this.engine, _object, "removeBehaviors", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.engine, _object, "retrieve", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Post(this.engine, _object, "remove", Encode(params), callback);
	},	
}

module.exports = Actor;