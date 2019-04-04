var qs = require('qs');
var https = require('https');
var url = require('url');
var extend = require('util')._extend;

function _get(session, object, command, params, callback){
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

function _post(session, object, command, params, callback){
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
}

var Comms = {
  // Taken from Stripe's Node.js SDK to provide backwards compatibility
  // with node versions before v7.9.
  callbackifyPromiseWithTimeout: function(promise, callback){
    if (callback) {
      // Ensure callback is called outside of promise stack.
      return promise.then(function(res) {
        setTimeout(function() { callback(null, res) }, 0);
      }, function(err) {
        setTimeout(function() { callback(err, null); }, 0);
      });
    }
    return promise;
  },
  get: function(session, object, command, params, callback){
    var promise = new Promise(function(resolve, reject) {
      function requestCallback(err, response) {
        if (err) {
          if (!(err instanceof Error)){
            err = new Error(err);
          }
          reject(err);
        } else {
          resolve(response);
        }
      }
      _get(session, object, command, params, requestCallback);
    });
    return this.callbackifyPromiseWithTimeout(promise, callback);
  },
  post: function(session, object, command, params, callback){
    var promise = new Promise(function(resolve, reject) {
      function requestCallback(err, response) {
        if (err) {
          if (!(err instanceof Error)){
            err = new Error(err);
          }
          reject(err);
        } else {
          resolve(response);
        }
      }
      _post(session, object, command, params, requestCallback);
    });
    return this.callbackifyPromiseWithTimeout(promise, callback);
  }
}

module.exports = Comms;