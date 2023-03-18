import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatcheModel from '../database/models/MatcheModel';
import {matchesMock, mockCreationMatches, matchesTeamsMock, userMock, teamsMock, mockCreate, loginMock, matchesTeamsMockTrue, mockCreationMatchesError, mockCreateError, mockIdError, mockCreationsError} from '../mocks/mocks';
import TeamsModel from '../database/models/TeamModel';
import UserModel from '../database/models/UserModel';

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
    sinon.stub(MatcheModel, 'findAll').resolves(matchesTeamsMockTrue as unknown as MatcheModel[]);
    const chaiHttpResponse= await chai
    .request(app)
      .get('/matches?inProgress=true')

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.length(2);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(matchesTeamsMockTrue);
  });

  it('atualiza os matches', async () => {
    sinon.stub(MatcheModel, 'update').resolves();
    const chaiHttpResponse = await chai
    .request(app)
      .patch('/matches/1')
      .send(
        {
          "homeTeamGoals": 2,
          "awayTeamGoals": 2
        }
      )

    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.have.property('message', 'sucesso');
  });

  it('retorna 401 quando não passa um token para cria matches', async () => {
    sinon.stub(MatcheModel, 'create').resolves();

    const chaiHttpResponse = await chai
      .request(app)
        .post('/matches')
          .send(mockCreationMatches);

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.eq('Token must be a valid token');
  });

  it('retorna objeto depois que criado a partida', async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    sinon.stub(MatcheModel, 'create').resolves(mockCreate as unknown as MatcheModel);

    sinon.stub(TeamsModel, 'findOne').resolves(teamsMock as unknown as TeamsModel);

    const { body: { token } } = await chai
      .request(app)
        .post('/login')
          .send(loginMock);

    const chaiHttpResponse = await chai
      .request(app)
        .post('/matches')
          .set('Authorization', token)
            .send(mockCreate);

    expect(chaiHttpResponse.body).to.deep.equal(mockCreate);
    expect(chaiHttpResponse.status).to.equal(201);
  });

  it('retorna erro quando tenta criar times com o mesmo nome', async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);

    sinon.stub(MatcheModel, 'create').resolves(mockCreationMatchesError as unknown as MatcheModel);

    sinon.stub(TeamsModel, 'findByPk').resolves(teamsMock as unknown as TeamsModel);

    const { body: { token } } = await chai
      .request(app)
        .post('/login')
          .send(loginMock);

    const chaiHttpResponse = await chai
      .request(app)
        .post('/matches')
          .set('Authorization', token)
            .send(mockCreateError);

      expect(chaiHttpResponse.body.message).to.be.eq('It is not possible to create a match with two equal teams');
      expect(chaiHttpResponse.status).to.equal(401);
  });

});
