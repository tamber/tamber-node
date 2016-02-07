var comms = require('../Comms');

var _object = "property";

function Encode(params){
	return params;
}

var Property = {
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
}

module.exports = Property;