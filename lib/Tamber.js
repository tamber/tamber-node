var Actor = require('Objects/Actor');
var Item = require('Objects/Item');
var Property = require('Objects/Property');
var Behavior = require('Objects/Behavior');
var Discover = require('Objects/Discover');



var defaultTimeout = 80;
var apiURL = "https://api.tamber.com/v1"


Tamber.prototype.New = function(key, client){
	client.ApiUrl = apiUrl;
	if (client.DefaultTimeout == null){
		client.DefaultTimeout = defaultTimeout;
	}
	this.Actor = Actor.getInstance(key, client);
	// this.Item = Item.getInstance(key, client);
	// this.Property = Property.getInstance(key, client);
	// this.Behavior = Behavior.getInstance(key, client);
	// this.Discover = Discover.getInstance(key, client);
}


module.exports = Tamber;