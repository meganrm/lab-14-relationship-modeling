//mongo schema
'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  group: {type: String},
  assets : [{}],
});

module.exports = mongoose.model('users', userSchema); // collection, Schema, creates constructor function
