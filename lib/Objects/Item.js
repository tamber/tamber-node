var comms = require('../Comms');

var _object = "item";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "tags":
			case "properties":
			case "updates":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}

	return params;
}

var Item = {
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
		comms.Post(this.engine, _object, "update",Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Get(this.engine, _object, "retrieve", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Get(this.engine, _object, "remove", Encode(params), callback);
	}
}

module.exports = Item;
