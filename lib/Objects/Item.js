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
	getInstance: function(session) {
		this.session = session;
      	return this;
  	},
	Create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	Update: function(params, callback){
		comms.Post(this.session, _object, "update",Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
	Remove: function(params, callback){
		comms.Post(this.session, _object, "remove", Encode(params), callback);
	}
}

module.exports = Item;
