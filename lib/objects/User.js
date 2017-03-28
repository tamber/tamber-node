var comms = require('../Comms');

var _object = "user";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "get_recs":
			case "events":
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
}

module.exports = User;