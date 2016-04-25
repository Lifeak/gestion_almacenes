"use strict";

const fs = require('fs');

module.exports = class almacenRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/almacen/almacen.html')
        .pipe(res);
    }
}
