'use strict';
/**
 * @file env example
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
// import
try {
  var decrypt = require('..').decrypt; // require('json-decrypt')
  var cfg = require('./cfg.json');
} catch (MODULE_NOT_FOUND) {
  console.error(MODULE_NOT_FOUND);
  process.exit(1);
}

if (process.env.p !== undefined) {
  cfg = decrypt(cfg, 'pr', process.env.p);
  console.log(cfg);
} else {
  console.log('missing env');
}
