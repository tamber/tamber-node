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
    return comms.post(this.session, _object, "create", this.encode(params), callback);
  },
  save: function(params, callback){
    return comms.post(this.session, _object, "save",this.encode(params), callback);
  },
  update: function(params, callback){
    return comms.post(this.session, _object, "update",this.encode(params), callback);
  },
  batch: function(params, callback){
    return comms.post(this.session, _object, "batch",this.encode(params), callback);
  },
  retrieve: function(params, callback){
    return comms.post(this.session, _object, "retrieve", this.encode(params), callback);
  },
  hide: function(params, callback){
    return comms.post(this.session, _object, "hide", this.encode(params), callback);
  },
  unhide: function(params, callback){
    return comms.post(this.session, _object, "unhide", this.encode(params), callback);
  },
  delete: function(params, callback){
    return comms.post(this.session, _object, "delete", this.encode(params), callback);
  },
  list: function(params, callback){
    return comms.post(this.session, _object, "list", this.encode(params), callback);
  },
  encode: function(params){
    for(var key in params){
      if (params.hasOwnProperty(key)) {
        switch(key){
        case "tags":
        case "properties":
        case "updates":
        case "items":
          params[key] = JSON.stringify(params[key]);
          break;
        }
      }
    }

    return params;
  }
}

module.exports = Item;
