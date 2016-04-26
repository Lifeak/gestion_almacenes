"use strict";

const fs = require('fs');

module.exports = class modeloRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/modelo/modelo.html')
        .pipe(res);
    }
}
