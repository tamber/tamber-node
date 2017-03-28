var btoa = require('btoa');
var Event = require('../lib/objects/Event');
var User = require('../lib/objects/User');
var Item = require('../lib/objects/Item');
var Behavior = require('../lib/objects/Behavior');
var Discover = require('../lib/objects/Discover');

var PACKAGE_VERSION = require('../package.json').version;

Tamber.DefaultTimeout = 80000, // in ms (this is 80 seconds)
Tamber.ApiUrl = "https://api.tamber.com/v1";

function Tamber(projectKey, engineKey){
	if (!(this instanceof Tamber)) {
		return new Tamber(projectKey, engineKey);
	}
	this.session = {};
	if(projectKey == null){
		projectKey = "";
	}
	if(engineKey == null){
		engineKey = "";
	}

	var headers = {
		"Authorization": "Basic " + btoa(projectKey + ":" + engineKey),
		"User-Agent": "Tamber/v1 NodeBindings/"+PACKAGE_VERSION
	}

	this.session = {
		project: projectKey,
		engine: engineKey,
		version: null,
		url: Tamber.ApiUrl,
		timeout: Tamber.DefaultTimeout,
		headers: headers,
	}
	this.event = new Event(this.session);
	this.user = new User(this.session);
	this.item = new Item(this.session);
	this.behavior = new Behavior(this.session);
	this.discover = new Discover(this.session);
}

Tamber.prototype = {
	setApiVersion: function(version){
		if(version){
			this.session.headers["Tamber-Version"] = version;
		}
	},
	setProjectKey: function(key){
		if(key){
			this.session.project = key;
			this._updateAuth();
		}
	},
	setEngineKey: function(key){
		if(key){
			this.session.engine = key;
			this._updateAuth();
		}
	},
	setTimeout: function(timeout){
		if(timeout){
			this.session.timeout = timeout;
		}
	},
	setApiUrl: function(url){
		if(url){
			this.session.url = url;
		}
	},
	getAttribute: function(key){
		return this.session[key];
	},
	_updateAuth: function(){
		this.session.headers["Authorization"] = "Basic " + btoa(this.session.project + ":" + this.session.engine);
	}
}

module.exports = Tamber;