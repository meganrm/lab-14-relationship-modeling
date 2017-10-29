/*global expect*/

const route = require('./file-routes');
const FileData = require('./model.js');


//mocks
let Res = function(){};

Res.prototype.status = function(status) {
  this.code = status;
  return this;
};

Res.prototype.send = function(body) {
  this.body = body;
  return this;
};

let res = new Res();

let next = function(error){
  return error;
};

describe('File Meta Data routes', () => {
  beforeAll(() => {
    storageManger.loadAll(FileData);
  });
  describe('get', () => {
    it('gets all the filedata objects if no id passed', () => {
      let req = {};
      req.query = {};
      req.body = {};
      let test = route.get(req, res, next);
      expect(test.code).toEqual(200);
      expect(test.body).toEqual({});
    });

    it('throws an 404 if the filedata is not found', () => {
      let req = {};
      req.query = {};
      req.body = {};
      req.query.id = 'id';
      let returned = route.get(req, res, next);

      expect(returned.status).toEqual(404);
      expect(returned.message).toEqual('that id does not match an item');
    });
  });

  describe('post', () => {
    it('returns 200 if body sent', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.body.task = 'do something else';
      let test = route.post(req, res, next);

      expect(test.code).toEqual(200);

    });

    it('returns 400 if no task', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.body.task = null;
      let returned = route.post(req, res, next);

      expect(returned.status).toEqual(400);
      expect(returned.message).toEqual('need a task to do');
    });
  });

  describe('delete', () => {

    it('throws an 404 if the filedata is not found', () => {

      let req = {};
      req.query = {};
      req.body = {};
      req.query.id = 'id';
      let returned = route.delete(req, res, next);

      expect(returned.status).toEqual(404);
      expect(returned.message).toEqual('not found');
    });
  });
});
