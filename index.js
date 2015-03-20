var readline = require('readline');
var fs = require('fs');
var rl;

var self = module.exports = {
  output: function () {
    console.log.apply(console, arguments);
  },
  divider: function () {
    self.output('--------------');
  },
  end: function () {
    if (rl) {
      rl.close();
    }
  },
  input: function (query) {
    var callback;
    var answer;
    if (!rl) {
      rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    }
    query = query.trim();
    query += ': ';
    function update() {
      if (callback !== undefined && answer !== undefined) {
        callback(answer);
      }
    }

    rl.question(query, function (a) {
      answer = a;
      update();
    });
    return {
      then: function (fn) {
        callback = fn;
        update();
      }
    }
  }
};
