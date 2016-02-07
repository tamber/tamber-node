var Event = require('../lib/Objects/Event');
var User = require('../lib/Objects/User');
var Item = require('../lib/Objects/Item');
var Property = require('../lib/Objects/Property');
var Behavior = require('../lib/Objects/Behavior');
var Discover = require('../lib/Objects/Discover');

var defaultTimeout = 80;
var apiUrl = "https://api.tamber.com/v1"

var defaultClient = {
	ApiUrl : apiUrl,
	DefaultTimeout: defaultTimeout
}

var Tamber = {
	New: function(key, client){
		if(client == null){
			client = defaultClient;
		} else {
			if(client.ApiUrl == null){
				cleint.ApiUrl = apiUrl;
			}
			if (client.DefaultTimeout == null){
				client.DefaultTimeout = defaultTimeout;
			}
		}
		this.Event = Event.getInstance(key, client);
		this.User = User.getInstance(key, client);
		this.Item = Item.getInstance(key, client);
		this.Property = Property.getInstance(key, client);
		this.Behavior = Behavior.getInstance(key, client);
		this.Discover = Discover.getInstance(key, client);
		return this;
	}
}

module.exports = Tamber;