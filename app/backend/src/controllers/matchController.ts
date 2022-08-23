import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class TeamController {
  constructor(private _matchesService: MatchesService) {}

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
}
