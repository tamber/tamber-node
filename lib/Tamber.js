var btoa = require('btoa');
var Event = require('../lib/Objects/Event');
var User = require('../lib/Objects/User');
var Item = require('../lib/Objects/Item');
var Behavior = require('../lib/Objects/Behavior');
var Discover = require('../lib/Objects/Discover');

var PACKAGE_VERSION = require('../package.json').version;

var defaultTimeout = 80,
	apiUrl = "https://api.tamber.com/v1";


var defaultConf = {
	ApiUrl : apiUrl,
	DefaultTimeout: defaultTimeout,
	ApiVersion: null,
	headers: {}
}

var Tamber = {
	New: function(projectKey, engineKey, config){

		if(engineKey == null){
			engineKey = "";
		}
		if(projectKey == null){
			projectKey = "";
		}

		if(config == null){
			config = defaultConf;
		} else {
			if (config.ApiUrl == null){
				config.ApiUrl = apiUrl;
			}
			if (config.DefaultTimeout == null){
				config.DefaultTimeout = defaultTimeout;
			}
		}
		// Authorization and Version HTTP Headers
		if (config.headers == null) {
			config.headers = {};
		}
		config.headers["Authorization"] = "Basic " + btoa(projectKey + ":" + engineKey);
		config.headers["User-Agent"] = "Tamber/v1 NodeBindings/"+PACKAGE_VERSION;
		if (!config.hasOwnProperty('ApiVersion')){
			config.ApiVersion = null;
		} else if (config.ApiVersion != null){
			config.headers["Tamber-Version"] = config.ApiVersion;
		}
		session = {
			project: projectKey,
			engine: engineKey,
			version: config.ApiVersion,
			url: config.ApiUrl,
			timeout: config.DefaultTimeout,
			headers: config.headers,
		}

		this.Event = Event.getInstance(session);
		this.User = User.getInstance(session);
		this.Item = Item.getInstance(session);
		this.Behavior = Behavior.getInstance(session);
		this.Discover = Discover.getInstance(session);
		return this;
	}
}

module.exports = Tamber;