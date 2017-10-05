var comms = require('../Comms');

var _object = "item";

function Item(session){
	if (!(this instanceof Item)) {
		return new Item(session);
	}
	this.session = session;
}

Item.prototype = {
	create: function(params, callback){
		comms.Post(this.session, _object, "create", this.encode(params), callback);
	},
	update: function(params, callback){
		comms.Post(this.session, _object, "update",this.encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", this.encode(params), callback);
	},
	hide: function(params, callback){
		comms.Post(this.session, _object, "hide", this.encode(params), callback);
	},
	unhide: function(params, callback){
		comms.Post(this.session, _object, "unhide", this.encode(params), callback);
	},
	delete: function(params, callback){
		comms.Post(this.session, _object, "delete", this.encode(params), callback);
	},
	encode: function(params){
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
}

module.exports = Item;
