var comms = require('../Comms');

var _object = "event";

function Encode(params){
	for(var key in params){
		if (params.hasOwnProperty(key)) {
			switch(key){
			case "events": //batch method only
				params[key] = JSON.stringify(params[key]);
				break;
			case "get_recs": //track method only
				params[key] = JSON.stringify(params[key]);
				break;
			}
		}
	}
	return params;
}

var Event = {
	getInstance: function(session) {
		this.session = session;
      	return this;
  	},
	Track: function(params, callback){
		comms.Post(this.session, _object, "track", Encode(params), callback);
	},
	Retrieve: function(params, callback){
		comms.Post(this.session, _object, "retrieve",Encode(params), callback);
	},
	Batch: function(params, callback){
		comms.Post(this.session, _object, "batch", Encode(params), callback);
	}	
}

module.exports = Event;