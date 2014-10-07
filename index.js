
// string interpolation -> inter

exports = module.exports = inter
exports.Block = Block

String.prototype.__defineGetter__("inter", function() {
    return inter(this).toString();
})

function inter(str) {
    return (new Block(str)).handle();
}

function Block(str) {
    if (!this instanceof Block) return new Block(str)

    this.str = str;
    this.consumed = -1;
    this.code = '';
}

Block.prototype.handle = function() {
    for (var i = 0; i < this.str.length; i++) {
        var cur = this.str[i];

        if (cur === '#') {
            if (this.str[i + 1] && this.str[i + 1] === '{') {
                // save previous string
                // i -> '#'
                // i+1 -> '{'
                this.handleString(i);

                // fi -> '{'
                // sec -> '}'
                var fi = i + 1;
                var sec = this.getSecond(fi);
                var variable = this.str.slice(fi + 1, sec).trim();

                this.code += '+' + variable + '+';
                this.consumed = sec;

                // update the index i
                i = sec;
            }
        }
    }

    // last string
    this.handleString()

    // last variable
    if (this.code.slice(-1) === '+') {
        this.code = this.code.slice(0, -1);
    }

    return this.code;
};

Block.prototype.handleString = function(end) {
    var start = this.consumed + 1;

    var s = null;
    if (end){ // end exists
        s = this.str.slice(start, end);
    }
    else{
        s = this.str.slice(start)
    }

    var code = s
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'")
        .replace(/\r?\n/g, '\\n');

    this.code += '"' + code + '"';
};

Block.prototype.getSecond = function(fi_index) {
    var pairs = {
        '{': '}',
        '[': ']',
        '(': ')'
    };

    var left = this.str[fi_index];
    var right = pairs[left];

    if (!right) return fi_index;

    var count = 1;
    for (var i = fi_index + 1; i < this.str.length; i++) {
        var cur = this.str[i];

        if (cur === right) {
            count--;
            if (count === 0) {
                return i;
            }
        }
        else if (cur === left) {
            count++;
        }
    }

    return -1; //not found
};