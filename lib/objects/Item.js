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

function Item(session){
	if (!(this instanceof Item)) {
		return new Item(session);
	}
	this.session = session;
}

Item.prototype = {
	create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	update: function(params, callback){
		comms.Post(this.session, _object, "update",Encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
	remove: function(params, callback){
		comms.Post(this.session, _object, "remove", Encode(params), callback);
	}
}

module.exports = Item;
