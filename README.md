# Tamber Node.js Library

[![Version](https://img.shields.io/npm/v/tamber.svg)](https://www.npmjs.org/package/tamber)
[![Build Status](https://travis-ci.org/tamber/tamber-node.svg?branch=master)](https://travis-ci.org/tamber/tamber-node)
[![Try on RunKit](https://badge.runkitcdn.com/tamber.svg)](https://runkit.com/npm/tamber)

Recommendation engines for developers. Build blazing fast, headscratchingly-accurate hosted recommendation engines in minutes.

[Get a free api key][homepage] to create your first project.

## Documentation

See [full API documentation][docs].

## Installation

```sh
npm install tamber --save
```

## Usage

Every resource is accessed via your `tamber` instance.

```js
var tamber = require('tamber');

var mytamber = tamber.New('your_project_key', 'your_engine_key', null);

mytamber.Discover.Recommended({
    user: "user_rlox8k927z7p"
}, function(err, recs) {
    err; // null if no error occurred 
    recs; // the recommended items for the user (20 items by default)
});
```

### Track real time Events

Track all of your events (user-item interactions in your app) to your project in real time, just like you would for a data analytics service.

```js
var tamber = require('tamber');

var mytamber = tamber.New('your_project_key', null, null);

mytamber.Event.Track({
    user: "user_rlox8k927z7p",
    behavior: "like",
    item: "item_wmt4fn6o4zlk",
}, function(err, event) {
    err; // null if no error occurred 
    item; // the tracked event object
});
```

Note that the Item Update method will automatically create novel items.

### Discover

In addition to recommendations, Tamber allows you to find similar item matches, similar items given a user, popular and hot items.

```js
var mytamber = tamber.New('your_project_key', 'your_engine_key', null);

mytamber.Discover.Similar({
    item: "item_wmt4fn6o4zlk"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});

mytamber.Discover.RecommendedSimilar({
    user: "user_rlox8k927z7p",
    item: "item_wmt4fn6o4zlk"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});

mytamber.Discover.Popular({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});

mytamber.Discover.Hot({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the hottest (trending) items
});
```

### Item properties

Setting your items' properties (optional!) allows you to filter recommendations (ex. items under $100), and build engines from subsets of your catalogue (ex. a recommendation engine just for your socks. Why not?). You can optionally include item properties in recommendation responses as well.

```js
mytamber.Item.Update({
    id: "item_wmt4fn6o4zlk",
    updates: {
        add: {
            properties: {
                "clothing_type": "pants",
                "stock":         90
            }
        },
        remove: {
            tags: ["casual"],
        }
    }
}, function(err, item) {
    err; // null if no error occurred 
    item; // the updated item object
});
```

### Configuration

You can pass a client config object when creating your `tamber` instance to set the Timeout and/or the ApiVersion:

```js
var config = {
    DefaultTimeout: 80,
    ApiVersion: "2017-3-8"
}

var mytamber = tamber.New('your_project_key', 'your_engine_key', config);
```

See [test.js](https://github.com/tamber/tamber-node/blob/master/test/test.js) for more examples.

[homepage]: https://tamber.com/
[docs]: https://tamber.com/docs/api/
[dashboard]: https://dashboard.tamber.com/
