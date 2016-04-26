"use strict";

const fs = require('fs');

module.exports = class clienteRoutes {
    static sendCRUD(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/cliente/cliente.html')
        .pipe(res);
    }
}
