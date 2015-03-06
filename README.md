# [json-decrypt](http://supergiovane.tk/#/json-decrypt)

[![NPM version](https://img.shields.io/npm/v/json-decrypt.svg)](https://www.npmjs.com/package/json-decrypt)
[![Linux Status](https://img.shields.io/travis/hex7c0/json-decrypt.svg?label=linux)](https://travis-ci.org/hex7c0/json-decrypt)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/json-decrypt.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/json-decrypt)
[![Dependency Status](https://img.shields.io/david/hex7c0/json-decrypt.svg)](https://david-dm.org/hex7c0/json-decrypt)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/json-decrypt.svg)](https://coveralls.io/r/hex7c0/json-decrypt)

decrypt (or encrypt) your json configuration (or object) with password.
You can save a key into user environment for decrypt this cfg file

## Installation

Install through NPM

```bash
npm install json-decrypt
```
or
```bash
git clone git://github.com/hex7c0/json-decrypt.git
```

## API

decrypt your Object key
```js
var decrypt = require('json-decrypt').decrypt;

var cfg = {
  fix: 'ciao',
  foo: 'hRzVwi8=',
  pr: [ 'foo' ]
};

var plaintext_cfg = decrypt(cfg, 'pr', process.env.p);
```

encrypt your Object key
```js
var encrypt = require('json-decrypt').encrypt;

var cfg = {
  fix: 'ciao',
  foo: 'hex7c',
  pr: [ 'foo' ]
};

var ciphertext_cfg = encrypt(cfg, 'pr', process.env.p);
```

### decrypt(obj, index, key, [cipher], [encoding])

#### options

 - `obj` - **Object** Your object *(default "required")*
 - `index` - **String** Object key *(default "required")*
 - `key` - **String** Your Key *(default "required")*
 - `cipher` - **String** Cipher *(default "aes-128-ctr")*
 - `encoding` - **String** Output encoding *(default "base64")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)
