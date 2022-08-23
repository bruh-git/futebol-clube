import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamController {
  constructor(private _teamService: TeamsService) {}

  async list(_req: Request, res: Response) {
    const teams = await this._teamService.list();

    return res.status(200).json(teams);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const teams = await this._teamService.findById(Number(id));

    return res.status(200).json(teams);
  }
}
