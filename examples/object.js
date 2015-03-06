'use strict';
/**
 * @file object instead of json file
 * @module json-decrypt
 * @package json-decrypt
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var decrypt = require('..').decrypt; // require('json-decrypt')

var cfg = { // use an object
  fix: 'ciao',
  foo: 'hRzVwi8=',
  pr: [ 'foo' ]
};

if (process.env.p !== undefined) {
  cfg = decrypt(cfg, 'pr', process.env.p);
  console.log(cfg);
} else {
  console.log('run "p=hex node object.js"');
}
