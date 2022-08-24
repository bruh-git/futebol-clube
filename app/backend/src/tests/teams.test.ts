import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamModel';
import {teamsMock} from '../mocks/mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {

  afterEach(() => {
    sinon.restore();
  })

  it('retorna todos os matches', async () => {
  sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as unknown as TeamsModel[]);
    const chaiHttpResponse = await chai
    .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.length(2);
  });
  
  it('retorna o time pelo id', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(teamsMock as unknown as TeamsModel);
    const chaiHttpResponse = await chai
    .request(app)
      .get('/teams/0')
  
    expect(chaiHttpResponse.status).to.equal(200);   
  });

});