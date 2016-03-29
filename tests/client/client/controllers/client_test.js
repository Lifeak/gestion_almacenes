"use strict";

describe('client', function() {
    var _scope;
    var CONTROLLER_NAME = 'client as clientCtrl';

    beforeEach(module('myAwesomeApp'));

    beforeEach(inject(function($injector) {
        _scope = $injector.get('$rootScope').$new();
    }))

    describe('init', function() {
        it('should create the controller correctly', inject(function($controller) {
            $controller(CONTROLLER_NAME, {$scope: _scope});
        }));
    })
})
