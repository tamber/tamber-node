var comms = require('../Comms');

var _object = "event";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "context":
			case "get_recs": //track method only
			case "events": //batch method only
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

function Event(session){
	if (!(this instanceof Event)) {
		return new Event(session);
	}
	this.session = session;
}

Event.prototype = {
	track: function(params, callback){
		comms.Post(this.session, _object, "track", Encode(params), callback);
	},
	retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve",Encode(params), callback);
	},
	batch: function(params, callback){
		comms.Post(this.session, _object, "batch", Encode(params), callback);
	}	
}

module.exports = Event;