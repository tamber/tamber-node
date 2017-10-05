var comms = require('../Comms');
var store = require('../Store');

var _object = "user";

function User(session){
	if (!(this instanceof User)) {
		return new User(session);
	}
	this.session = session;
}

User.prototype = {
	create: function(params, callback){
		store.setDefaultUser(this.session, params, "id");
		comms.Post(this.session, _object, "create", this.encode(params), callback);
	},
	update: function(params, callback){
		store.setDefaultUser(this.session, params, "id");
		comms.Post(this.session, _object, "update", this.encode(params), callback);
	},
	retrieve: function(params, callback){
		store.setDefaultUser(this.session, params, "id");
		comms.Post(this.session, _object, "retrieve", this.encode(params), callback);
	},
	search: function(params, callback){
		comms.Post(this.session, _object, "search", this.encode(params), callback);
	},
	merge: function(params, callback){
		comms.Post(this.session, _object, "merge", this.encode(params), callback);
	},
	encode: function(params){
		for(var key in params){
			if (params.hasOwnProperty(key)) {
				switch(key){
				case "get_recs":
				case "filter":
				case "metadata":
					params[key] = JSON.stringify(params[key]);
					break;
				case "events":
					// do not need to set default user - handled automatically in backend
					params[key] = JSON.stringify(params[key]);
					break;
				}
			}
		}
		return params;
	},
}

module.exports = User;