var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var qs = require('qs');
var https = require('https');
var url = require('url');
var extend = require('util')._extend;

var Comms = {
    Post: function(engine, object, command, params, callback){

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/" + object + "/" + command;
        var headers = engine.Client.headers;
        var post_options = {
            scheme:"https",
            host: url.parse(engine.Client.ApiUrl).hostname,
            path: path,
            method: 'POST',
            headers: extend({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body)}, 
                engine.Client.headers)
        };
 
        var req = https.request(post_options, function(res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var jsonObj = JSON.parse(body);
                if (callback != null){
                    callback(jsonObj.error, jsonObj.result);
                }
            });
        });

        req.setTimeout(engine.Client.DefaultTimeout*1000, function() {
            if (callback != null){
                callback(null, "Timeout exceeded " + engine.Client.DefaultTimeout + "s");
            }
        });

        req.write(body);
        req.end();
    },
    Get: function(engine, object, command, params, callback){
         params["command"]=command;

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/"+object + "/" + command + "/?" + body;

        var get_options = {
            scheme:"https",
            host: url.parse(engine.Client.ApiUrl).hostname,
            path: path,
            method: 'GET',
            headers: engine.Client.headers
          };
 
        var req = https.request(get_options, function(res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var jsonObj = JSON.parse(body);
                if (callback != null){
                    callback(jsonObj.error, jsonObj.result);
                }
            });
        });

        req.setTimeout(engine.Client.DefaultTimeout*1000, function() {
            if (callback != null){
                callback(null, "Timeout exceeded " + engine.Client.DefaultTimeout + "s");
            }
        });

        req.end();
    }
}

module.exports = Comms;