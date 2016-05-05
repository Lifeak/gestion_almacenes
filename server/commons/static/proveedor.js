"use strict";

const fs = require('fs');

module.exports = class proveedorRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/proveedor/proveedor.html')
        .pipe(res);
    }
}
