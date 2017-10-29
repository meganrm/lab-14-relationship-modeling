'use strict';


const app = module.exports = require('express')();
const fileDataRouter = require(__dirname + '/../fileData/file-routes');

app.use('/api/v1', fileDataRouter);

app.use((err, req, res, next) => {
  console.log(err);
  let status = err.status || 400;
  let message = err.message || 'oh no server error';
  return res.status(status).send(message);
});
//always have an airity of 4
