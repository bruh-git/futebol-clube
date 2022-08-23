import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {userMock, loginMock} from '../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('espera que retorne o status 200', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    const chaiHttpResponse =  await chai
      .request(app)
        .post('/login')
        .send(loginMock)
    
    expect(chaiHttpResponse.status).to.equal(200);
  });

});
