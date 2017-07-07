var comms = require('../Comms');

var _object = "user";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "get_recs":
			case "events":
			case "filter":
			case "metadata":
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

function User(session){
	if (!(this instanceof User)) {
		return new User(session);
	}
	this.session = session;
}

User.prototype = {
	create: function(params, callback){
		comms.Post(this.session, _object, "create", Encode(params), callback);
	},
	update: function(params, callback){
		comms.Post(this.session, _object, "update", Encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve", Encode(params), callback);
	},
	search: function(params, callback){
		comms.Post(this.session, _object, "search", Encode(params), callback);
	},
	merge: function(params, callback){
		comms.Post(this.session, _object, "merge", Encode(params), callback);
	},
}

module.exports = User;