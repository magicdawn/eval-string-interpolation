var assert = require('assert');
var inter = require('../')

describe('string-interpolation', function() {
    it('use string.inter', function() {
        var name = 'zhang',
            age = 18;
        var s = eval("#{ name },#{ age }".inter)

        assert(s == 'zhang,18')
    })

    it('@ -> this', function() {
        (function() {
            var s = eval("#{ @name }".inter)
            assert.equal(s,this.name)

            s = eval("#{ @['content-type'] }".inter)
            assert.equal(s,this['content-type'])
        }).call({
            name: 'zhang',
            age: 18,
            'content-type': 'text/plain'
        })
    })
});