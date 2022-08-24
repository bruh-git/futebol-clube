import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatcheModel from '../database/models/MatcheModel';
import {matchesMock} from '../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('retorna todos os matches', async () => {
  sinon.stub(MatcheModel, 'findAll').resolves(matchesMock as unknown as MatcheModel[]);
    const chaiHttpResponse = await chai
    .request(app)
      .get('/matches')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.length(2);
  });

  it('retorna matches finalizados', async () => {
    sinon.stub(MatcheModel, 'update').resolves();
    const chaiHttpResponse = await chai
    .request(app)
      .patch('/matches/3/finish')
    expect(chaiHttpResponse.body).to.have.property('message', 'Finished');
  });

  it('retorna matches pelo termo', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves();
    const response = await chai
    .request(app)
      .get('/matches?inProgress=true')

    expect(response.status).to.equal(200);
    expect(response.body).to.length(0);
  });

});

