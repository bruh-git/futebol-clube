import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamModel';
import { teamsMock } from '../mocks/mocks';


chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {

  afterEach(()=>{
    sinon.restore();
  })

  it('retorna erro quando não encontra leaderboard', async () => {
    sinon
      .stub(TeamsModel, 'findAll')
      .resolves(teamsMock);
    const response = await chai
    .request(app)
      .get('/leaderboard')

    expect(response.status).to.equal(500);
  });

  it('retorna erro quando não encontraleaderboard home', async () => {
    sinon
      .stub(TeamsModel, 'findAll')
      .resolves(teamsMock);
    const response = await chai
    .request(app)
      .get('/leaderboard/home')

    expect(response.status).to.equal(500);
  });

  it('retorna erro quando não encontra leaderboard away', async () => {
    sinon
      .stub(TeamsModel, 'findAll')
      .resolves(teamsMock);
    const response = await chai
    .request(app)
      .get('/leaderboard/away')

    expect(response.status).to.equal(500);
  });

});

