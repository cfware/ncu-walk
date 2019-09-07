# ncu-walk

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

Generate a fake package.json with dependencies for all packages in node_modules

### Install ncu-walk

This utility requires node.js 8 or above.

```sh
npm i -g ncu-walk
```

## Usage

From a location where `**/node_modules` exists run the following:

```sh
ncu-walk | ncu
```

`ncu-walk` treats all installed modules as `dependencies`, prints to console data
resembling `package.json` with enough information for [ncu] to check all installed
versions.  Without arguments `ncu-walk` will find the newest version of all installed
packages.  This can be changed by running `ncu-walk --oldest | ncu` to report based
on the oldest versions found.

It is not possible to use an option to ignore devDependencies with `ncu-walk`.  To do
this you must first run `npm prune --only=prod` to uninstall devDependencies.

[npm-image]: https://img.shields.io/npm/v/ncu-walk.svg
[npm-url]: https://npmjs.org/package/ncu-walk
[travis-image]: https://travis-ci.org/cfware/ncu-walk.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/ncu-walk
[gk-image]: https://badges.greenkeeper.io/cfware/ncu-walk.svg
[downloads-image]: https://img.shields.io/npm/dm/ncu-walk.svg
[downloads-url]: https://npmjs.org/package/ncu-walk
[license-image]: https://img.shields.io/npm/l/ncu-walk.svg
