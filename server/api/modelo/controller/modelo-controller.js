"use strict";

const ModeloDAO = require('../dao/modelo-dao');

module.exports = class ModeloController {
  static getAll(req, res) {
      ModeloDAO
        .getAll()
        .then(modelos => res.status(200).json(modelos))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    //console.log("entro en getbyId");
    let _id = req.params.id;
    ModeloDAO
      .getbyId(_id)
      .then(modelo => res.status(200).json(modelo))
      .catch(error => res.status(400).json(error));
  }

  static getbyName(req,res){
    //console.log("el nombre que llega es: "+req.params.nombre);
    let _name = req.params.nombre;
    ModeloDAO
      .getbyName(_name)
      .then(modelo => res.status(200).json(modelo))
      .catch(error => res.status(400).json(error));
  }


  static createModelo(req, res) {
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      let _modelo = req.body;
      console.log("el modelo que deberia llegar es: "+_modelo.nombre,_modelo.refinterna,_modelo.caracteristicas,_modelo.modeloDe, _modelo.compuestoPor);
      ModeloDAO
        .createModelo(_modelo)
        .then(modelo => res.status(201).json(modelo))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteModelo(req, res) {
    let _id = req.params.id;

    ModeloDAO
      .deleteModelo(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
