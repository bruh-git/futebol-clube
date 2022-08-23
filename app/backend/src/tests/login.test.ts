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

  it('retorna 404', async () => {
    sinon.stub(UserModel, "findOne").callsFake(() => {
      throw new Error();
    })

    const response = await chai.request(app)
      .post('/login/404')

    expect(response.status).to.equal(404)
  });

});