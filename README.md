# [json-decrypt](http://supergiovane.tk/#/json-decrypt)

[![NPM version](https://badge.fury.io/js/json-decrypt.svg)](http://badge.fury.io/js/json-decrypt)
[![Build Status](https://travis-ci.org/hex7c0/json-decrypt.svg)](https://travis-ci.org/hex7c0/json-decrypt)
[![Dependency Status](https://david-dm.org/hex7c0/json-decrypt/status.svg)](https://david-dm.org/hex7c0/json-decrypt)

json-decrypt your object from being overridden

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
```

encrypt your Object key
```js
var encrypt = require('json-decrypt').encrypt;
```

### decrypt(obj,index,key,[cipher],[encoding])

#### options

 - `obj` - **Object** Your object *(default "required")*
 - `index` - **String** Object key *(default "required")*
 - `key` - **String** Your Key *(default "required")*
 - `cipher` - **String** Cipher *(default "aes-128-ctr")*
 - `encoding` - **String** Output encoding *(default "base64")*

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)