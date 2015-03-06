'use strict';
/**
 * @file encrypt this object
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
var encrypt = require('..').encrypt; // require('json-decrypt')

var cfg = { // use an object
  fix: 'ciao',
  foo: 'hex7c',
  pr: [ 'foo' ]
};

if (process.env.p !== undefined) {
  cfg = encrypt(cfg, 'pr', process.env.p);
  console.log(cfg);
} else {
  console.log('run "p=hex node object.js"');
}
