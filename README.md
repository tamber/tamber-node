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

const items = await tamber.discover.recommended({
    user: "user_rlox8k927z7p",
    number: 8
});
```

You may also use Promises and callbacks for versions of Node earlier than 7.10.0.

```js
// promise
tamber.discover.recommended({
    user: "user_rlox8k927z7p"
}).then(items => handle(items));

// callback
tamber.discover.recommended({
    user: "user_rlox8k927z7p"
}, function(err, items){
    err;    // null if no error occurred 
    items;  // the recommended items
});
```

To initialize your `tamber` instance on ES6:

```js
import Tamber from 'tamber';
const tamber = Tamber('project_key');
```

### Client side initialization

We recommend implementing `tamber` client-side for event tracking, and in your backend for recommendation generation as part of normal page loading – but you can implement `tamber` in any configuration that works for you.

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
const user = await tamber.user.merge({
    from: "temporary/guest_user_id", 
    to: "signed_in_user_id"
});
```

### Track real time Events

Track all of your events (user-item interactions in your app) to your project in real time, just like you would for a data analytics service. Note that users and items will automatically be created and updated as needed.

```js
const event = await tamber.event.track({
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
    context: {
        page: "homepage", 
        section: "featured"
    }
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p",
});
```

Just start streaming events for the behaviors in your app (ex. 'clicked/viewed', 'shared', and 'purchased'), then kick back and wait for the data to accumulate (~1-2 weeks) before moving ahead with `Discover`.

### Discover

Once you have tracked enough events and created your engine, you may begin using `discover` to put personalized recommendations in your app.

The primary methods of discovery in Tamber are the `discover.next` and `discover.recommended` methods. `discover.next` is often the most impactful tool for driving lift, allowing you to turn your item pages into steps on personalized paths of discovery – it returns the optimal set of items that the user should be shown next on a given item page.

`discover.recommended` works similarly, but is optimized for a recommended section, often located on a homepage.

#### Up Next

Keep users engaged by creating a path of discovery as they navigate from item to item, always showing the right mix of items they should check out next. Just add the id of the item that the user is navigating to / looking at.

```js
const items = await tamber.discover.next({
    item: "item_wmt4fn6o4zlk",
    number: 14,
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p"
});
```

##### `get_properties`

If you are setting [properties for your items][properties], you can include these properties in recommendation responses to simplify data handling. For example, you might have `title`, `img`, and `price` properties that you can use to display items to users without needing to make an additional request for each recommendation.

##### `continuation`

Tamber's recommendations are optimized for the exact moment and context of the user at the time of request, so standard pagination is not possible. Instead, `discover.next` and `discover.recommended` use automatic continuation to allow you to 'show more' or implement infinite scrolling. 

When you want to add more recommendations to those currently displayed to the user, just set `continuation` to `true`. Tamber will automatically generate the set of items that should be appended to the current user-session's list. The user-session is reset when either `discover.next` or `discover.recommended` is called without `continuation`.

```js
const items = await tamber.discover.next({
    item: "item_wmt4fn6o4zlk",
    number: 10,
    continuation: true
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the next items
});
```

#### For You

To put personalized recommendations on your homepage, or in any recommended section, just call `discover.recommended` with the number of recommendations you want to display (if you are calling server-side, also set the `user`).

```js
const items = await tamber.discover.recommended({
    number: 10,
    get_properties: true,
    // If implementing server-side, set the user field
    // user: "user_rlox8k927z7p"
}, function(err, discoveries) {
    err; // null if no error occurred 
    discoveries; // the next items
});
```

#### Trending

Help your users keep their fingers on the pulse of your platform by showing them the hottest, most popular, newest, or most up-and-coming items.

```js
const hot = await tamber.discover.hot(); // the hottest (trending) items

const popular = tamber.discover.popular(); // the most popular items

const uac = tamber.discover.uac(); // the most up-and-coming items

const _new = tamber.discover.new(); // the newest items
```

### Item properties

Setting your items' properties allows you to filter recommendations (ex. only recommend items under $100), and build engines from subsets of your catalogue (ex. a recommendation engine for artists, and an engine for songs). You can optionally include item properties in recommendation responses as well.

Just

```js
const item = await tamber.item.update({
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
});
```

Note that the item update method will automatically create novel items.

### Configuration

You can set the Timeout and Api Version of a `tamber` instance:

```js
tamber.setTimeout(40000); // in ms
tamber.setApiVersion("2019-3-31");
```

### Multiple Engines

You can easily create multiple `tamber` instances to interface with each of your engines and projects.

```js
var Tamber = require('../lib/Tamber');

var tamber_1 = new Tamber('project_key_A','engine_key_A1'),
    tamber_2 = new Tamber('project_key_A','engine_key_A2'),
    tamber_3 = new Tamber('project_key_B','engine_key_B1');
```

See [test.js](https://github.com/tamber/tamber-node/blob/master/test/test.js) for more examples.

[homepage]: https://tamber.com/
[docs]: https://tamber.com/docs/api
[dashboard]: https://dashboard.tamber.com/
[properties]: https://tamber.com/docs/guides/filtering.html
