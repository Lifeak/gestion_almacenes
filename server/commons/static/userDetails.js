"use strict";

const fs = require('fs');

module.exports = class userRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/user/user.html')
        .pipe(res);
    }
}
