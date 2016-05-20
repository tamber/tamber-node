var btoa = require('btoa');
var Event = require('../lib/Objects/Event');
var User = require('../lib/Objects/User');
var Item = require('../lib/Objects/Item');
var Behavior = require('../lib/Objects/Behavior');
var Discover = require('../lib/Objects/Discover');

var defaultTimeout = 80;
var apiUrl = "https://api.tamber.com/v1"

var defaultClient = {
	ApiUrl : apiUrl,
	DefaultTimeout: defaultTimeout,
	ApiVersion: null,
	
	headers: {}
}

var Tamber = {
	New: function(key, client){
		if(client == null){
			client = defaultClient;
		} else {
			if (client.ApiUrl == null){
				client.ApiUrl = apiUrl;
			}
			if (client.DefaultTimeout == null){
				client.DefaultTimeout = defaultTimeout;
			}
			// Authorization and Version HTTP Headers
			client.headers = {};
			client.headers["Authorization"] = "Basic " + btoa(key +":");
			if (!client.hasOwnProperty('ApiVersion')){
				client.ApiVersion = null;
			} else if (client.ApiVersion != null){
				client.headers["Tamber-Version"] = client.ApiVersion;
			}
		}
		this.Event = Event.getInstance(key, client);
		this.User = User.getInstance(key, client);
		this.Item = Item.getInstance(key, client);
		this.Behavior = Behavior.getInstance(key, client);
		this.Discover = Discover.getInstance(key, client);
		return this;
	}
}

module.exports = Tamber;