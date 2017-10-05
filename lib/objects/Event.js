var comms = require('../Comms');
var store = require('../Store');

var _object = "event";

function Event(session){
	if (!(this instanceof Event)) {
		return new Event(session);
	}
	this.session = session;
}

Event.prototype = {
	track: function(params, callback){
		store.setDefaultUser(this.session, params, "user");
		comms.Post(this.session, _object, "track", this.encode(params), callback);
	},
	retrieve: function(params, callback){
		store.setDefaultUser(this.session, params, "user");
		comms.Post(this.session, _object, "retrieve", this.encode(params), callback);
	},
	batch: function(params, callback){
		comms.Post(this.session, _object, "batch", this.encode(params), callback);
	},
	encode: function(params){
		for(var key in params){
			if (params.hasOwnProperty(key)) {
				switch(key){
				case "context":
				case "get_recs": //track method only
					params[key] = JSON.stringify(params[key]);
					break;
				case "events": //batch method only
					for(var i = 0; i<params[key].length; i++){
						store.setDefaultUser(this.session, params[key][i], "user");
					}
					console.log("events:", params[key]);
					params[key] = JSON.stringify(params[key]);
					break;
				}
			}
		}
		return params;
	}	
}

module.exports = Event;