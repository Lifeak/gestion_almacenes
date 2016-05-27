"use strict";

describe('myFilter', function() {
  var _myFilter;

  beforeEach(module('myAwesomeApp'));

  beforeEach(inject(function($filter) {
    _myFilter = $filter('myFilter');
  }));

  describe('doSomething', function() {
    it('should return an empty string', function() {
      var _input = null;
      expect(_myFilter(_input)).toEqual('');
    })

    it('should return the input', function() {
      var _input = 'a';
      expect(_myFilter(_input)).toEqual(_input);
    })
  })
})
