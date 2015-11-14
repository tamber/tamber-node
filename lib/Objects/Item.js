var comms = require('../Comms');

var _object = "item";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "properties":
				params[key] = JSON.stringify(params[key]);
				break;
			case "tags":
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
	AddProperties: function(params, callback){
		comms.Post(this.engine, _object, "addProperties",Encode(params), callback);
	},
	RemoveProperties: function(params, callback){
		comms.Post(this.engine, _object, "removeProperties", Encode(params), callback);
	},
	AddTags: function(params, callback){
		comms.Post(this.engine, _object, "addTags",Encode(params), callback);
	},
	RemoveTags: function(params, callback){
		comms.Post(this.engine, _object, "removeTags", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.engine, _object, "retrieve", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Post(this.engine, _object, "remove", Encode(params), callback);
	},	
}

module.exports = Item;