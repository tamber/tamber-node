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
var tamber = require('tamber')('your_project_key');

tamber.discover.next({
    user: "user_rlox8k927z7p",
    number: 8
}, function(err, recs) {
    err; // null if no error occurred 
    recs; // the recommended items for the user
});
```

To initialize your `tamber` instance on ES6:

```js
import tamberPkg from 'tamber';
const tamber = tamberPkg('project_key');
```

### Client side initialization

We recommend implementing `tamber` client-side, though you can also implement `tamber` in your backend.

#### Set User

Set the User wherever you load your user's unique ID from your backend, or wherever you load user ids from.

```js
tamber.setUser("user_id");
```

#### Track Guests (Anonymous / Signed-Out Users)

If you would like to personalize your app for guest users, you can use tamber's built-in guest user handling. It will automatically create a temporary user. Then, when a user signs in or creates an account, simply call `setUser` as normal and tamber will automatically `merge` the temporary user to the signed-in user account so their recommendations remain consistent.

```js
var tamber = require('tamber')('your_project_key');
tamber.setTrackGuests(true);
```

If you already handle guest user accounts internally and want to handle this manually, just call `user.merge` when a guest user signs in or creates account.

```js
tamber.user.merge({
    from: "temporary/guest_user_id", 
    to: "signed_in_user_id"
}, function(err, result) {
     err; // null if no error occurred 
});
```

### Track real time Events

Track all of your events (user-item interactions in your app) to your project in real time, just like you would for a data analytics service. Note that novel users and items will automatically be created.

```js
var tamber = require('tamber')('project_key');

tamber.event.track({
    behavior: "like",
    item: "item_wmt4fn6o4zlk",

    // if implementing server-side, set the user field
    user: "user_rlox8k927z7p",
}, function(err, event) {
    err; // null if no error occurred 
    event; // the tracked event object
});
```

### Discover

Once you have created your engine, you may begin using `discover` to put personalized recommendations in your app.

The primary method of discovery in Tamber is the `discover.next` method. `discover.next` returns the optimal set of items that the user should see next. Simply call it at the time that the page loads with the current item – or, if displaying recommendations to the user in a recommended section, you can also call it with only the user set.

```js
var tamber = require('tamber')('project_key');

// client-side implementation only
tamber.setTrackGuests(true);
tamber.setUser("user_id");

tamber.discover.next({
    item: "item_wmt4fn6o4zlk"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});
```

In addition to `discover.next`, Tamber allows you to get popular and hot items, as well as use lower-level methods to get lists of recommended items, similar item matches, and similar items for a given user.

```js
var tamber = require('tamber')('project_key');

tamber.discover.popular({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});

tamber.discover.hot({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the hottest (trending) items
});

tamber.discover.recommended({
    user: "user_rlox8k927z7p"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});

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
tamber.setApiVersion("2017-9-11");
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
[docs]: https://tamber.com/docs/
[dashboard]: https://dashboard.tamber.com/
