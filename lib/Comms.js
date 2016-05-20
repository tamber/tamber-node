var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var btoa = require('btoa');
var qs = require('qs');
var https = require('https');
var url = require('url');

var Comms = {
    Post: function(engine, object, command, params, callback){

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/" + object + "/" + command;
        var post_options = {
            scheme:"https",
            host: url.parse(engine.Client.ApiUrl).hostname,
            path: path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(body),
              "Authorization": "Basic " + btoa(engine.Key +":"),
            }
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

        var path = "/v1/"+object+"/?"+body;

        var post_options = {
            scheme:"https",
            host: url.parse(engine.Client.ApiUrl).hostname,
            path: path,
            method: 'GET',
            headers: {
              "Authorization": "Basic " + btoa(engine.Key +":")
            }
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

        req.end();
    }
}

module.exports = Comms;