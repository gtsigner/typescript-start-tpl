const assert = require('assert');

const {describe, it} = require('mocha');

describe('test websocket', function () {
    it('should return -1 when the value is not present', function () {
        console.log(1)
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});