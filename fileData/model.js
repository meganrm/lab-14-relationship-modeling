//mongo schema
'use strict';

const mongoose = require('mongoose');

const fileMetaDataSchema = new mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, default: Date.now()},
  user : {type: mongoose.Schema.Types.ObjectId, ref:'users'},
  path : {type: String, required: true, unique:true},
  description : {type: String, required: true},
});

module.exports = mongoose.model('filemetadata', fileMetaDataSchema); // collection, Schema, creates constructor function
