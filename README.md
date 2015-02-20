# freshen-up

[![Build Status](https://travis-ci.org/odino/node-freshen-up.png?branch=master)](https://travis-ci.org/odino/node-freshen-up)

The stupidest JS utility you can ever think of:
`freshen-up` lets you cache the product of a
function and refresh its value at a given interval.

It **might** be useful when you need to cache some
values (reading files from the filesystem, API result)
and want to refresh those values every now and then.

## Installlation

```
npm install freshen-up
```

## Usage

The library is pretty straightforward:

``` javascript
var freshenUp = require('freshen-up');

function loadConfigurationFromTheDatabase() {
  // ...
  // ...
};

var config = freshenUp(loadConfigurationFromTheDatabase);

config.get().someValue; // will be something
config.get().someValue; // will be something else
```

As you might understand, `freshen-up` accepts your
function and exposes the `get` method to access the
value of that function.

Another example:

``` javascript
var freshenUp = require('freshen-up');

function pingGoogleDotComToCheckWhetherWeHaveInternetAccess() {
  // will return true or false
};

var ping = freshenUp(pingGoogleDotComToCheckWhetherWeHaveInternetAccess);

ping.get(); // true

// disconnect from the network

ping.get(); // false
```

By default, `freshen-up`  refreshes every 50ms, but
you can override this setting by just specifying your
custom interval:

``` javascript
var freshenUp = require('freshen-up');

function pingGoogleDotComToCheckWhetherWeHaveInternetAccess() {
  // will return true or false
};

// set an interval of 1s
var ping = freshenUp(pingGoogleDotComToCheckWhetherWeHaveInternetAccess, 1000);

ping.get(); // true

// disconnect from the network
// the value of the function hasn't been refreshed yet
ping.get(); // true

// if we check after 1s, the value has changed
setTimeout(function(){
  ping.get(); // false
}, 1000);
```

## Alternatives

Cache invalidation. But that's [too much of a problem](http://martinfowler.com/bliki/TwoHardThings.html).

But yeah, seriously, you can think of a 100 times to
do this more efficiently.