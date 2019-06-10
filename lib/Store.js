var store = require('store');

const TMB_UID_KEY = "tmb_uid";

var Store = {
	getGuestId: function(){
		return store.get(TMB_UID_KEY);
	},
	removeGuestId: function(){
		store.remove(TMB_UID_KEY);
	},
	initGuestId: function(){
		var id = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 21; i++ ){
			id += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		id = "tmb_" + id;
		store.set(TMB_UID_KEY, id);   
		return id;
	},
	getOrCreateGuest: function(){
		var uid = this.getGuestId();
		if (uid == null){
			uid = this.initGuestId();
		}
		return uid;
	},
	// Sets the params object user field to the default user id after the following checks:
	// 	1. No user value is found in the provided params object.
	// 	2. Default user is available.  Either set manually, or generated if `trackGuests`
	// 	is enabled.
	setDefaultUser: function(session, params, key){
		if(!params.hasOwnProperty(key) || params[key] == null){
			if (session.defaultUser != null && session.defaultUser != "") {
				params[key] = session.defaultUser;
			} else if (session.trackGuests){
				var uid = this.getOrCreateGuest();
				session.defaultUser = uid;
				params[key] = session.defaultUser;
			}
		}
	},
}

module.exports = Store;