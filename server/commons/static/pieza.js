"use strict";

const fs = require('fs');

module.exports = class piezaRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/pieza/pieza.html')
        .pipe(res);
    }
}
