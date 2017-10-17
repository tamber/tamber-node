var qs = require('qs');
var https = require('https');
var url = require('url');
var extend = require('util')._extend;

var Comms = {
    Post: function(session, object, command, params, callback){

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/" + object + "/" + command;
        var headers = session.headers;
        var post_options = {
            scheme:"https",
            host: url.parse(session.url).hostname,
            path: path,
            method: 'POST',
            headers: extend({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(body)}, 
                session.headers)
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

        req.setTimeout(session.timeout, function() {
            if (callback != null){
                callback("Timeout exceeded " + session.timeout + "s", null);
            }
        });

        req.write(body);
        req.end();
    },
    Get: function(session, object, command, params, callback){
         params["command"]=command;

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/"+object + "/" + command + "/?" + body;

        var get_options = {
            scheme:"https",
            host: url.parse(session.url).hostname,
            path: path,
            method: 'GET',
            headers: session.headers
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

        req.setTimeout(session.timeout, function() {
            if (callback != null){
                callback("Timeout exceeded " + session.timeout + "s", null);
            }
        });

        req.end();
    }
}

module.exports = Comms;