import { Request, Response } from 'express';
import LeaderBoardService from '../services/Leaderboards';

export default class LeaderBoardController {
  constructor(private _leaderService: LeaderBoardService) {}

  public async list(_req: Request, res: Response) {
    const leaderBord = await this._leaderService.list('');
    return res.status(200).json(leaderBord);
  }

  public async listHome(_req: Request, res: Response) {
    const leaderBordHome = await this._leaderService.list('home');
    return res.status(200).json(leaderBordHome);
  }

  public async listAway(_req: Request, res: Response) {
    const leaderBordAway = await this._leaderService.list('away');
    return res.status(200).json(leaderBordAway);
  }
}
