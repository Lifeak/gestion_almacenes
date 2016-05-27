"use strict";

const fs = require('fs');

module.exports = class probandoRoutes {
    static sendHola(req, res) {
      var _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/client/dev/probando/probando.html')
        .pipe(res);
    }
}
