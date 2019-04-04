var comms = require('../Comms');
var store = require('../Store');

var _object = "discover";

function DiscoverBasic(session, encode){
  if (!(this instanceof DiscoverBasic)) {
    return new DiscoverBasic(session, encode);
  }
  this.session = session;
  this.encode = encode;
}

DiscoverBasic.prototype = {
  recommended: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "basic/recommended", this.encode(params), callback);
  },
  similar: function(params, callback){
    return comms.post(this.session, _object, "basic/similar", this.encode(params), callback);
  },
  recommendedSimilar: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "basic/recommended_similar", this.encode(params), callback);
  }
}

function Discover(session){
  if (!(this instanceof Discover)) {
    return new Discover(session);
  }
  this.session = session;
  this.basic = new DiscoverBasic(session, this.encode);
}

Discover.prototype = {
  recommended: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "recommended", this.encode(params), callback);
  },
  up_next: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "next", this.encode(params), callback);
  },
  next: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "next", this.encode(params), callback);
  },
  weekly: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "weekly", this.encode(params), callback);
  },
  daily: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "daily", this.encode(params), callback);
  },
  meta: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.post(this.session, _object, "meta", this.encode(params), callback);
  },
  popular: function(params, callback){
    return comms.post(this.session, _object, "popular", this.encode(params), callback);
  },
  hot: function(params, callback){
    return comms.post(this.session, _object, "hot", this.encode(params), callback);
  },
  uac: function(params, callback){
    return comms.post(this.session, _object, "uac", this.encode(params), callback);
  },
  new: function(params, callback){
    return comms.post(this.session, _object, "new", this.encode(params), callback);
  },
  userPopular: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.get(this.session, _object, "user_trend/popular", this.encode(params), callback);
  },
  userHot: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.get(this.session, _object, "user_trend/hot", this.encode(params), callback);
  },
  userUAC: function(params, callback){
    store.setDefaultUser(this.session, params, "user");
    return comms.get(this.session, _object, "user_trend/uac", this.encode(params), callback);
  },
  encode: function(params){
    for(var key in params){
      if (params.hasOwnProperty(key)) {
        switch(key){
        case "exclude_items":
        case "filter":
          params[key] = JSON.stringify(params[key]);
          break;
        case "test_events":
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

module.exports = Discover;