"use strict";

const fs = require('fs');

module.exports = class productoRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/producto/producto.html')
        .pipe(res);
    }
}
