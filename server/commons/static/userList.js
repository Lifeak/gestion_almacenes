"use strict";

const fs = require('fs');

module.exports = class userList {
    static sendList(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/user/templates/list.html')
        .pipe(res);
    }
}
