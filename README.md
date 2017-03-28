# Tamber Node.js Library

[![Version](https://img.shields.io/npm/v/tamber.svg)](https://www.npmjs.org/package/tamber)
[![Build Status](https://travis-ci.org/tamber/tamber-node.svg?branch=master)](https://travis-ci.org/tamber/tamber-node)
[![Try on RunKit](https://badge.runkitcdn.com/tamber.svg)](https://runkit.com/npm/tamber)

Recommendation engines for developers, easy as π. Build blazing fast, head-scratchingly accurate hosted recommendation engines in minutes.

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
var tamber = require('tamber')('your_project_key', 'your_engine_key');

tamber.discover.recommended({
    user: "user_rlox8k927z7p"
}, function(err, recs) {
    err; // null if no error occurred 
    recs; // the recommended items for the user (20 items by default)
});
```

To initialize your `tamber` instance on ES6:

```js
import tamberPkg from 'tamber';
const tamber = tamberPkg('project_key', 'engine_key');
```

### Track real time Events

Track all of your events (user-item interactions in your app) to your project in real time, just like you would for a data analytics service. Note that novel users and items will automatically be created.

```js
var tamber = require('tamber')('project_key');

tamber.event.track({
    user: "user_rlox8k927z7p",
    behavior: "like",
    item: "item_wmt4fn6o4zlk",
}, function(err, event) {
    err; // null if no error occurred 
    item; // the tracked event object
});
```

### Discover

In addition to recommendations, Tamber allows you to find similar item matches, similar items given a user, and popular and hot items.

```js
var tamber = require('tamber')('project_key', 'engine_key');

tamber.discover.similar({
    item: "item_wmt4fn6o4zlk"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});

tamber.discover.recommendedSimilar({
    user: "user_rlox8k927z7p",
    item: "item_wmt4fn6o4zlk"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});

tamber.discover.popular({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});

tamber.discover.hot({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the hottest (trending) items
});
```

### Item properties

Setting your items' properties (optional!) allows you to filter recommendations (ex. only recommend items under $100), and build engines from subsets of your catalogue (ex. a recommendation engine for artists, and an engine for songs). You can optionally include item properties in recommendation responses as well.

```js
tamber.item.update({
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

Note that the item update method will automatically create novel items.

### Configuration

You can set the Timeout and Api Version of a `tamber` instance:

```js
tamber.setTimeout(40000); // in ms
tamber.setApiVersion("2017-3-8");
```

### Multiple Engines

You can easily create multiple `tamber` instances to interface with each of your engines and projects.

```js
var tamberPkg = require('../lib/Tamber');

var tamber_1 = new tamberPkg('project_key_A','engine_key_A1'),
    tamber_2 = new tamberPkg('project_key_A','engine_key_A2'),
    tamber_3 = new tamberPkg('project_key_B','engine_key_B1');
```

See [test.js](https://github.com/tamber/tamber-node/blob/master/test/test.js) for more examples.

[homepage]: https://tamber.com/
[docs]: https://tamber.com/docs/api/
[dashboard]: https://dashboard.tamber.com/
