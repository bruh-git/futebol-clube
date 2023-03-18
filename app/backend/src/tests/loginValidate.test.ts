import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {userMock, loginMock, errorLoginMock} from '../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login/validate', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('retorne o token not found caso o token não seja encontrado', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .get('/login/validate')
        .send(errorLoginMock)
    
    expect(chaiHttpResponse.body).to.have.property('message', 'Token not found')
  });

  it('retorne Expired or invalid token quando passado token inválido', async () => {
      const token = 'fsgfgfadsga6554415';
      const chaiHttpResponse = await chai
        .request(app)
          .get('/login/validate')
          .set('Authorization', token);

      expect(chaiHttpResponse).to.have.status(401);

      expect(chaiHttpResponse.body).to.have.property('message', 'Expired or invalid token');
  });

  it('retorna o role em caso de successo', async () => {
  sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    const { body: { token } } = await chai
      .request(app)
        .post('/login')
        .send(loginMock);

    const chaiHttpResponse = await chai
      .request(app)
        .get('/login/validate')
        .set('Authorization', token);

    expect(chaiHttpResponse.body)
      .to.have.property('role', 'admin');
  });
})