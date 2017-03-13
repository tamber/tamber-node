var btoa = require('btoa');
var Event = require('../lib/Objects/Event');
var User = require('../lib/Objects/User');
var Item = require('../lib/Objects/Item');
var Behavior = require('../lib/Objects/Behavior');
var Discover = require('../lib/Objects/Discover');

var PACKAGE_VERSION = require('../package.json').version;

var defaultTimeout = 80,
	apiUrl = "https://api.tamber.com/v1";


var defaultClient = {
	ApiUrl : apiUrl,
	DefaultTimeout: defaultTimeout,
	ApiVersion: null,
	headers: {}
}

var Tamber = {
	New: function(projectKey, engineKey, client){

		if(engineKey == null){
			engineKey = "";
		}
		if(projectKey == null){
			projectKey = "";
		}

		if(client == null){
			client = defaultClient;
		} else {
			if (client.ApiUrl == null){
				client.ApiUrl = apiUrl;
			}
			if (client.DefaultTimeout == null){
				client.DefaultTimeout = defaultTimeout;
			}
		}
		// Authorization and Version HTTP Headers
		if (client.headers == null) {
			client.headers = {};
		}
		client.headers["Authorization"] = "Basic " + btoa(projectKey + ":" + engineKey);
		client.headers["User-Agent"] = "Tamber/v1 NodeBindings/"+PACKAGE_VERSION;
		if (!client.hasOwnProperty('ApiVersion')){
			client.ApiVersion = null;
		} else if (client.ApiVersion != null){
			client.headers["Tamber-Version"] = client.ApiVersion;
		}

		this.Event = Event.getInstance(projectKey, engineKey, client);
		this.User = User.getInstance(projectKey, engineKey, client);
		this.Item = Item.getInstance(projectKey, engineKey, client);
		this.Behavior = Behavior.getInstance(projectKey, engineKey, client);
		this.Discover = Discover.getInstance(projectKey, engineKey, client);
		return this;
	}
}

module.exports = Tamber;