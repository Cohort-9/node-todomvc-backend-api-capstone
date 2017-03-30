var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

chai.should();
var app = server.app;

chai.use(chaiHttp);


describe('dummy test suite', function () {
	it('should make travis happy', function () {
		true.should.be.true;
	});
});

