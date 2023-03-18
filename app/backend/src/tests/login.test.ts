import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {userMock, loginMock, errorLoginMock, userNotAuthMock} from '../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('retorne o status 200 em caso de login com sucesso', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(loginMock)
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('retorne o status 401 quando usuário não autorizado', async () => {

    sinon.stub(UserModel, 'findOne').resolves();

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(userNotAuthMock)
    
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('', async () => {
    sinon.stub(UserModel, 'findOne').resolves(loginMock as UserModel);
    sinon.stub(UserModel, 'findByPk').resolves(loginMock as UserModel);
    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send({ email: 'qualquer@gmail.com', password: '78544267868686868' })
    
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });


  it('retorne o status 400 quando usuário não preenche email ou senha', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(errorLoginMock)
    
    expect(chaiHttpResponse.status).to.equal(400);
  });

  it('retorne uma mensagem padrão quando usuário não preenche email ou senha', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(errorLoginMock)
    
    expect(chaiHttpResponse.body).to.have.property('message', 'All fields must be filled')
  });

  it('retorne um token quando usuario loga', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(loginMock)
    
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('retorna o role ', async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    const chaiHttpResponse = await chai
    .request(app)
      .get('/login/validate')
      .set( 
      {   
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjYxNzgwMTUxLCJleHAiOjE2NjIyMTIxNTF9.6e9s7y4vcfirDC6rlmh7SBZzAig5iFG0O8IMqkB2Kuc'
      }
      )

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('role').include('admin');
  });

  it('sem o token retorna 401', async () => {
    const response = await chai.request(app)
      .get('/login/validate')

    expect(response.status).to.equal(401)
  })

  it('sem o token retorna a mensagem Token not found', async () => {
    const response = await chai.request(app)
      .get('/login/validate')

    expect(response.body.message).to.equal('Token not found');
  })

});