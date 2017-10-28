'use strict';


const app = module.exports = require('express')();
const bearRouter = require(__dirname + '/../fileData/file-routes');

app.use('/api/v1', bearRouter);

app.use((err, req, res, next) => {
  console.log(err.error);
  res.status(err.statusCode || 500).send(err.message || 'server error');
  next();
});
//always have an airity of 4
