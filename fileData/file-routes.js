'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const FileData = require('./model');
const ServerError = require('../lib/error');


const fileRouter = module.exports = express.Router();

fileRouter.get('/aics_files', (req, res, next) => {
  let findObject = req.query || {};
  FileData.find(findObject)
    .then(files => res.send(files))
    .catch(err => next(new ServerError (404, 'cant find what you are looking for', err)));
});

fileRouter.get('/aics_files/:id', (req, res, next) => {
  FileData.findOne({_id : req.params.id})
    .then(files => res.send(files))
    .catch(err => next(new ServerError (err)));
});

fileRouter.post('/aics_files', jsonParser, (req, res, next) => {
  let newFileData = new FileData(req.body);
  newFileData.save() // saves the file to the database
    .then(data => res.send(data))
    .catch(err => next(new ServerError (500, 'error creating file')));
});

fileRouter.delete('/aics_files', jsonParser, (req, res, next) => {
  FileData.remove({_id: req.params.id})
    .then(data => res.send('bear successfully murdered'))
    .catch(err => next(new ServerError ()));
});

fileRouter.patch('/aics_files/:id', jsonParser, (req, res, next) => {
  delete req.body._id;
  FileData.findOneAndUpdate({_id : req.params.id}, {$set:req.body})
    .then(data => res.send('success!'))
    .catch(err => next(new ServerError ()));
});
