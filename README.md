# Tamber API Client for Node.js [![Build Status](https://travis-ci.org/tamber/tamber-node.svg?branch=master)](https://travis-ci.org/tamber/tamber-node)

You can sign up for a Tamber account at https://tamber.com.

For full API documentation, refer to https://tamber.com/docs/api.

Installation
============

```sh
npm install tamber
```

Usage
=====

Every resource is accessed via your `tamber` instance:

```js
var tamber = require('tamber');
```

Track Events in real time:

```js
var tamber = require('tamber');

var mytamber = tamber.New('key_sBW1WHQ4bP4Ryfz3AQOo', null);

mytamber.Event.Track({
    user: "user_rlox8k927z7p",
    behavior: "like",
    item: "item_wmt4fn6o4zlk",
}, function(result, err) {
    if (err) {
        console.log("Request failed with error: " + err);
    } else {
        console.log(result);
    }
});
```

Get recommendations:

```js
var tamber = require('tamber');

var mytamber = tamber.New('key_sBW1WHQ4bP4Ryfz3AQOo', null);

mytamber.Discover.Recommended({
    user: "user_rlox8k927z7p"
}, function(result, err) {
    if (err) {
        console.log("Request failed with error: " + err);
    } else {
        for (var i in result) {
            console.log(result[i]["item"] + " : " + result[i]["score"]);
        }
    }
});
```

See [test.js](https://github.com/tamber/tamber-node/blob/master/test/test.js) for more examples.

