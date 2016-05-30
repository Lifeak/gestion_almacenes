"use strict";

const mongoose = require('mongoose');
//const mongodb =require('mongodb');
const dbConst = require('../constants/db.json');
//var ObjectID =  mongodb.ObjectID;

module.exports = class DBConfig {
    static init() {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGOHQ_URL
                                                          : dbConst.localhost;
       console.log("url conection "+URL);                                               
      mongoose.connect(URL);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};/*
var db;
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database){
	if(err){
		console.log(err);
		process.exit(1);
	}
	db = database;
	console.log("Database conection ready");
	var server= app.listen


});*/
