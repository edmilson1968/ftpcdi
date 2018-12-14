process.env.NODE_ENV = 'test';

var express = require('..');
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:3000";
var server = require('../index');

chai.use(require('chai-string'));

describe("Teste API api.ftpcdi",function(){
  
  it("verifica o health check",function(done){
    request.get(
      {
        url : urlBase + "/"
      },
      function(error, response, body){
        var _body = {};
        try{
          _body = body;
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(200);

        expect(_body).to.startWith('Hello World');
        

        done();
      }
    );
  })

  it("faz a chamada na api ",function(done){
    
    //busca uma taxa cdi anual e diaria
    request.get(
      {
        url : urlBase + "/cdi/20181127.txt" 
      },
      function(error, response, body){

        // precisamos converter o retorno para um objeto json
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        // sucesso (200)?
        expect(response.statusCode).to.equal(200);

        // agora, verificamos se retornou a propriedade cards
        if( _body.should.have.property('cdi') ){
          //verifica se eh um numero
          expect(_body.cdi).to.be.finite;
          //testa o valor especifico
          expect(_body.cdi).to.equal(6.40);
        }
        if( _body.should.have.property('cdidia') ){
          //verifica se eh um numero
          expect(_body.cdidia).to.be.finite;
          //testa o valor especifico
          expect(_body.cdidia).to.equal(1.00024620);
        }

        done(); // avisamos o test runner que acabamos a validação e já pode proseeguir
      }
    );
  });

  
});