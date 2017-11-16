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

If you would like to personalize your app for guest users, you can use tamber's built-in guest user handling. It will automatically create temporary users when needed.

```js
var tamber = require('tamber')('your_project_key');
tamber.setTrackGuests(true);
```

Then, when a user signs in or creates an account, simply call `setUser` as normal and tamber will automatically `merge` the temporary user's profile to the signed-in user account so their recommendations persist.

```js
// Insert wherever user sign in / account creation is handled
tamber.setUser("new_signed_in_user_id");
```

If you handle guest user accounts internally and want to handle this manually, just call `user.merge` when a guest user signs in or creates account.

```js
// Insert wherever user sign in / account creation is handled
tamber.user.merge({
    from: "temporary/guest_user_id", 
    to: "signed_in_user_id"
}, function(err, result) {
     err; // null if no error occurred.
});
```

### Track real time Events

Track all of your events (user-item interactions in your app) to your project in real time, just like you would for a data analytics service. Note that users and items will automatically be created and updated as needed.

```js
tamber.event.track({
    item: {
        id: "item_wmt4fn6o4zlk",
        properties: {
            type: "book",
            title: "The Moon is a Harsh Mistress",
            img: "https://img.domain.com/book/The_Moon_is_a_Harsh Mistress.jpg" 
        },
        tags: ["sci-fi", "bestseller"]
    }
    behavior: "like",
    context: ["homepage", "featured_section"]
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p",
}, function(err, event) {
    err; // null if no error occurred 
    event; // the tracked event object
});
```

Just start streaming events for the behaviors in your app (ex. 'clicked/viewed', 'shared', and 'purchased'), then kick back and wait for the data to accumulate (~1-2 weeks) before moving ahead with `Discover`.

### Discover

Once you have tracked enough events and created your engine, you may begin using `discover` to put personalized recommendations in your app.

The primary method of discovery in Tamber is the `discover.next` method, which returns the optimal set of items that the user should be shown next.

#### For You

To put personalized recommendations on your homepage, or in any recommended section, just call `discover.next` with the number of recommendations you want to display (if you are calling server-side, also set the `user`).

```js
tamber.discover.next({
    number: 10,
    get_properties: true,
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});
```

##### `get_properties`

If you are setting [properties for your items][properties], you can include these properties in recommendation responses to simplify data handling. For example, you might have `title`, `img`, and `price` properties that you can use to display items to users without needing to make an additional request for each recommendation.

##### `continuation`

`discover.next` is optimized for the exact moment and context of the user at the time of request, so standard pagination is not possible. Instead, `discover.next` uses automatic continuation to allow you to 'show more' or implement infinite scrolling. 

When you want to add more recommendations to those currently displayed to the user, just set the `continuation` field to `true`. Tamber will automatically generate the set of items that should be appended to the current user-session's list. The `discover.next` user-session is reset when `discover.next` is called without `continuation`.

```js
tamber.discover.next({
    number: 10,
    continuation: true
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});
```

#### Up Next

Keep users engaged by creating a path of discovery as the navigate from item to item, always showing the right mix of items they should check out next. Just add the id of the item that the user is navigating to / looking at.

```js
tamber.discover.next({
    item: "item_wmt4fn6o4zlk",
    number: 14,
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the similar items
});
```

#### Trending

Help your users keep their fingers on the pulse of your platform by showing them the hottest, most popular, newest, or most up-and-coming items.

```js
tamber.discover.hot({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the hottest (trending) items
});

tamber.discover.popular({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});

// BETA endpoints
tamber.discover.uac({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});

tamber.discover.new({}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the most popular items
});
```

#### Build Your Own Features

Tamber allows you to use lower-level methods to get lists of recommended items, similar item matches, and similar items for a given user with which you can build your own discovery experiences. Importantly, these methods return raw recommendation data and are not intended to be pushed directly to users.

```js
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

Setting your items' properties allows you to filter recommendations (ex. only recommend items under $100), and build engines from subsets of your catalogue (ex. a recommendation engine for artists, and an engine for songs). You can optionally include item properties in recommendation responses as well.

Just

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
[docs]: https://tamber.com/docs/api
[dashboard]: https://dashboard.tamber.com/
[properties]: https://tamber.com/docs/guides/filtering.html
