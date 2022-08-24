import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import AuthService from '../services/AuthService';
import Teams from '../database/models/TeamModel';

export default class TeamController {
  constructor(private _matchesService: MatchesService) { }

  async list(req: Request, res: Response) {
    const { inProgress } = req.query;

    let matches;

    switch (true) {
      case inProgress === 'true':
        matches = await this._matchesService.filterByQuery();
        break;
      default:
        matches = await this._matchesService.list();
        break;
    }
    return res.status(200).json(matches);
  }

  async create(req: Request, res: Response) {
    const { authorization: token } = req.headers as { authorization: string };
    AuthService.validateMatches(token);

    const partida = req.body;

    if (partida.homeTeam === partida.awayTeam) {
      const error = new Error('It is not possible to create a match with two equal teams');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const verifyHomeTeam = await Teams.findByPk(partida.homeTeam);
    const verifyAwayTeam = await Teams.findByPk(partida.awayTeam);

    if (!verifyHomeTeam || !verifyAwayTeam) {
      const error = new Error('There is no team with such id!');
      error.name = 'NotFoundError';
      throw error;
    }

    const matches = await this._matchesService.create(partida);

    return res.status(201).json(matches);
  }

  async finish(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchesService.finish(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}
