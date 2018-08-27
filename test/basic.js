'use strict';
/**
 * @file basic test
 * @module json-decrypt
 * @subpackage test
 * @version 0.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var decrypt = require('..').decrypt;
var encrypt = require('..').encrypt;
var assert = require('assert');

/*
 * test module
 */

describe('error', function() {

  var a;
  beforeEach(function(done) {

    a = {
      fix: 'ciao',
      foo: 'hex7c',
      foo2: 'ciao',
      foo3: {
        p: 'hex7c00',
        f: {
          p: 'hex7c000'
        }
      },
      foo4: {
        p: 'hex7c0000',
        f: true
      },
      private: [ 'foo', 'foo2', 'foo3.p', 'foo3.f.p', 'foo4.p' ]
    };
    done();
  });

  it('should return Error because wrong Object', function(done) {

    try {
      encrypt('ciao');
    } catch (e) {
      assert.equal(e.message, 'First argument is not an Object');
    }
    try {
      decrypt('ciao');
    } catch (e) {
      assert.equal(e.message, 'First argument is not an Object');
    }
    done();
  });
  it('should return Error because missing index', function(done) {

    try {
      encrypt(a, 'private22');
    } catch (e) {
      assert.equal(e.message, 'Second argument is undefined');
    }
    try {
      decrypt(a, 'private22');
    } catch (e) {
      assert.equal(e.message, 'Second argument is undefined');
    }
    done();
  });
  it('should return Error because missing key', function(done) {

    try {
      encrypt(a, 'private');
    } catch (e) {
      assert.equal(/(Must give cipher-type, key|Key must be a buffer)/
          .test(e.message), true);
    }
    try {
      decrypt(a, 'private');
    } catch (e) {
      assert.equal(/(Must give cipher-type, key|Key must be a buffer)/
          .test(e.message), true);
    }
    done();
  });
  it('should return Error because unknown cipher', function(done) {

    try {
      encrypt(a, 'private', 'hex', 'foobar');
    } catch (e) {
      // node@0.10 throw
      // assert.equal(/Unknown cipher/.test(e.message), true);
    }
    try {
      decrypt(a, 'private', 'hex', 'foobar');
    } catch (e) {
      // node@0.10 throw
      // assert.equal(/Unknown cipher/.test(e.message), true);
    }
    done();
  });
  it('should return a different Object because wrong key', function(done) {

    var c = encrypt(a, 'private', 'hex');
    var b = decrypt(c, 'private', 'ciao');
    assert.equal(c.fix, 'ciao');
    assert.equal(c.foo4.f, true);
    assert.equal(b.fix, 'ciao');
    assert.equal(b.foo4.f, true);
    assert.notEqual(b.foo, 'hex7c');
    assert.notEqual(b.foo3.p, 'hex7c00');
    assert.notEqual(b.foo3.f.p, 'hex7c000');
    assert.notEqual(b.foo4.p, 'hex7c0000');
    done();
  });
  it('should return a different Object because wrong cipher', function(done) {

    var c = encrypt(a, 'private', 'hex');
    var b = decrypt(c, 'private', 'hex', 'rc4');
    assert.equal(c.fix, 'ciao');
    assert.equal(c.foo4.f, true);
    assert.equal(b.fix, 'ciao');
    assert.equal(b.foo4.f, true);
    assert.notEqual(b.foo, 'hex7c');
    assert.notEqual(b.foo3.p, 'hex7c00');
    assert.notEqual(b.foo3.f.p, 'hex7c000');
    assert.notEqual(b.foo4.p, 'hex7c0000');
    done();
  });
  it('should return a different Object because wrong encoding', function(done) {

    var c = encrypt(a, 'private', 'hex');
    var b = decrypt(c, 'private', 'hex', false, 'hex');
    assert.equal(c.fix, 'ciao');
    assert.equal(c.foo4.f, true);
    assert.equal(b.fix, 'ciao');
    assert.equal(b.foo4.f, true);
    assert.notEqual(b.foo, 'hex7c');
    assert.notEqual(b.foo3.p, 'hex7c00');
    assert.notEqual(b.foo3.f.p, 'hex7c000');
    assert.notEqual(b.foo4.p, 'hex7c0000');
    done();
  });
});

describe('correct', function() {

  var a = {
    fix: 'ciao',
    foo: 'hex7c',
    foo2: 'ciao',
    foo3: {
      p: 'hex7c00',
      f: {
        p: 'hex7c000'
      }
    },
    foo4: {
      p: 'hex7c0000',
      f: true
    },
    private: [ 'foo', 'foo2', 'foo3.p', 'foo3.f.p', 'foo4.p' ]
  };

  describe('basic', function() {

    it('should return a decrypted Object', function(done) {

      a = encrypt(a, 'private', 'hex');
      assert.equal(a.fix, 'ciao');
      assert.equal(a.foo4.f, true);
      assert.equal(a.foo, 'hRzVwi8=');
      assert.equal(a.foo3.p, 'hRzVwi8H9A==');
      assert.equal(a.foo3.f.p, 'hRzVwi8H9EY=');
      assert.equal(a.foo4.p, 'hRzVwi8H9EaX');
      done();
    });
    it('should return an encrypted Object', function(done) {

      var b = decrypt(a, 'private', 'hex');
      assert.equal(b.fix, 'ciao');
      assert.equal(b.foo4.f, true);
      assert.equal(b.foo, 'hex7c');
      assert.equal(b.foo3.p, 'hex7c00');
      assert.equal(b.foo3.f.p, 'hex7c000');
      assert.equal(b.foo4.p, 'hex7c0000');
      done();
    });
  });

  describe('different key', function() {

    it('should return a decrypted Object', function(done) {

      a = encrypt(a, 'private', 'hello');
      assert.equal(a.fix, 'ciao');
      assert.equal(a.foo4.f, true);
      done();
    });
    it('should return an encrypted Object', function(done) {

      var b = decrypt(a, 'private', 'hello');
      assert.equal(b.fix, 'ciao');
      assert.equal(b.foo4.f, true);
      assert.equal(b.foo, 'hex7c');
      assert.equal(b.foo3.p, 'hex7c00');
      assert.equal(b.foo3.f.p, 'hex7c000');
      assert.equal(b.foo4.p, 'hex7c0000');
      done();
    });
  });

  describe('different cipher', function() {

    it('should return a decrypted Object', function(done) {

      a = encrypt(a, 'private', 'hex', 'rc4');
      assert.equal(a.fix, 'ciao');
      assert.equal(a.foo4.f, true);
      done();
    });
    it('should return an encrypted Object', function(done) {

      var b = decrypt(a, 'private', 'hex', 'rc4');
      assert.equal(b.fix, 'ciao');
      assert.equal(b.foo4.f, true);
      assert.equal(b.foo, 'hex7c');
      assert.equal(b.foo3.p, 'hex7c00');
      assert.equal(b.foo3.f.p, 'hex7c000');
      assert.equal(b.foo4.p, 'hex7c0000');
      done();
    });
  });

  describe('different encoding', function() {

    it('should return a decrypted Object', function(done) {

      a = encrypt(a, 'private', 'hex', false, 'hex');
      assert.equal(a.fix, 'ciao');
      assert.equal(a.foo4.f, true);
      done();
    });
    it('should return an encrypted Object', function(done) {

      var b = decrypt(a, 'private', 'hex', false, 'hex');
      assert.equal(b.fix, 'ciao');
      assert.equal(b.foo4.f, true);
      assert.equal(b.foo, 'hex7c');
      assert.equal(b.foo3.p, 'hex7c00');
      assert.equal(b.foo3.f.p, 'hex7c000');
      assert.equal(b.foo4.p, 'hex7c0000');
      done();
    });
  });

  describe('with double quotes', function() {

    var a = {
      fix: 'ciao',
      foo: 'hex7c',
      foo2: '"ciao"',
      foo3: {
        p: '"hex7c00"',
        f: {
          p: 'hex7c000'
        }
      },
      foo4: {
        p: 'hex7c0000',
        f: true
      },
      private: [ 'foo', 'foo2', 'foo3.p', 'foo3.f.p', 'foo4.p' ]
    };

    it('should return a decrypted Object', function(done) {

      a = encrypt(a, 'private', 'hex');
      assert.equal(a.fix, 'ciao');
      assert.equal(a.foo4.f, true);
      assert.equal(a.foo, 'hRzVwi8=');
      assert.equal(a.foo2, 'zxrElCMV');
      assert.equal(a.foo3.p, 'zxHIjXtU9EaF');
      assert.equal(a.foo3.f.p, 'hRzVwi8H9EY=');
      assert.equal(a.foo4.p, 'hRzVwi8H9EaX');
      done();
    });
    it('should return an encrypted Object', function(done) {

      var b = decrypt(a, 'private', 'hex');
      assert.equal(b.fix, 'ciao');
      assert.equal(b.foo4.f, true);
      assert.equal(b.foo, 'hex7c');
      assert.equal(b.foo2, '"ciao"');
      assert.equal(b.foo3.p, '"hex7c00"');
      assert.equal(b.foo3.f.p, 'hex7c000');
      assert.equal(b.foo4.p, 'hex7c0000');
      done();
    });
  });
});
