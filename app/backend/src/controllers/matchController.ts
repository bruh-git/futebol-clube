import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class TeamController {
  constructor(private _matchesService: MatchesService) {}

  async list(_req: Request, res: Response) {
    const matches = await this._matchesService.list();

    return res.status(200).json(matches);
  }
}
