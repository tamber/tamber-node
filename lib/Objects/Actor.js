var comms = require('../Comms');

var _object = "actor"

function Encode(params){
	Object.keys(params).map(function(key) {
		switch(key){
			case "behaviors":
				params[key] = JSON.stringify(params[key]);
				break;
			case "getRecs":
				params[key] = JSON.stringify(params[key]);
				break;
		}
    });
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
		comms.Post(this.engine, _object, "addBehaviors", Encode(params), callback);
	},
	RemoveBehaviors: function(params, callback){
		comms.Post(this.engine, _object, "removeBehaviors", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Get(this.engine, _object, "retrieveBehaviors", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Post(this.engine, _object, "remove", Encode(params), callback);
	},	
}

module.exports = Actor;