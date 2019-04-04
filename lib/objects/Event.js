var comms = require('../Comms');
var store = require('../Store');

var _object = "event";

function EventMeta(session, encode){
  if (!(this instanceof EventMeta)) {
    return new EventMeta(session, encode);
  }
  this.session = session;
  this.encode = encode;
}

EventMeta.prototype = {
  like: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "meta/like", this.encode(params), callback);
  },
  unlike: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "meta/unlike", this.encode(params), callback);
  }
}

function Event(session){
  if (!(this instanceof Event)) {
    return new Event(session);
  }
  this.session = session;
  this.meta = new EventMeta(session, this.encode);
}

Event.prototype = {
  track: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "track", this.encode(params), callback);
  },
  retrieve: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "retrieve", this.encode(params), callback);
  },
  batch: function(params, callback){
    return comms.post(this.session, _object, "batch", this.encode(params), callback);
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
          params[key] = JSON.stringify(params[key]);
          break;
        case "user":
        case "item":
          if(params[key] !== null && typeof params[key] === 'object'){
            params[key] = JSON.stringify(params[key]);
          }
          break;
        }
      }
    }
    return params;
  } 
}

module.exports = Event;