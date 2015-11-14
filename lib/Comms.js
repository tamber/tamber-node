var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var btoa = require('btoa');
var qs = require('qs');
var https = require('https');

var Comms = {
    Post: function(engine, object, command, params, callback){

        params["command"]=command;

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/"+object;

        var post_options = {
            scheme:"https",
            host: "dev.tamber.com",
            path: path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(body),
              "Authorization": "Basic " + btoa(engine.Key +":")
            }
          };
 
        var post_req = https.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
                var jsonObj = JSON.parse(chunk);
                if (callback != null){
                    callback(jsonObj.result, jsonObj.error);
                }
            });
        });

        post_req.write(body);
        post_req.end();

    },
    Get: function(engine, object, command, params, callback){
         params["command"]=command;

        var body = qs.stringify(params, {arrayFormat: 'brackets'});

        var path = "/v1/"+object+"/?"+body;

        var post_options = {
            scheme:"https",
            host: "dev.tamber.com",
            path: path,
            method: 'GET',
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              // 'Content-Length': Buffer.byteLength(body),
              "Authorization": "Basic " + btoa(engine.Key +":")
            }
          };
 
        var req = https.request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('Response: ' + chunk);
                var jsonObj = JSON.parse(chunk);
                if (callback != null){
                    callback(jsonObj.result, jsonObj.error);
                }
            });
        });

        // post_req.write(body);
        req.end();
       

    }
}


module.exports = Comms;