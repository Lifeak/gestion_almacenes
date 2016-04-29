"use strict";

const fs = require('fs');

module.exports = class garantiaRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/garantia/garantia.html')
        .pipe(res);
    }
}
