import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teamsMock, matchesTeamsMockFalse } from '../mocks/mocks';
import MatcheModel from '../database/models/MatcheModel';
import TeamsModel from '../database/models/TeamModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {

  afterEach(()=>{
    sinon.restore();
  })

  it('retorna erro quando não encontra leaderboard', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesTeamsMockFalse as unknown as MatcheModel[]);
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[]);

    const response = await chai
    .request(app)
      .get('/leaderboard');

      expect(response.status).to.be.eq(500);
  });

  it('retorna erro quando não encontra leaderboard home', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesTeamsMockFalse as unknown as MatcheModel[]);
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[]);
    const response = await chai
    .request(app)
      .get('/leaderboard/home');

      expect(response.status).to.be.eq(500);
  });

  it('retorna erro quando não encontra leaderboard away', async () => {
    sinon.stub(MatcheModel, 'findAll').resolves(matchesTeamsMockFalse as unknown as MatcheModel[]);
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[]);
    const response = await chai
    .request(app)
      .get('/leaderboard/away');

      expect(response.status).to.be.eq(500);
  });

});

