import Matches from '../database/models/MatcheModel';
import Teams from '../database/models/TeamModel';
import LeaderBoard from '../utils/LeaderBoardUtils';
/* import ILeaderBoards from '../interfaces/ILeaderboards'; */
// retorno esperado
/* [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
] */

/* type leaderBoardMap = Array<ILeaderBoards>; */

export default class LeaderBoardService {
/*   constructor(private _data:ILeaderBoards) {} */

  list = async (path: string) => {
    const result = await Teams.findAll(
      {
        attributes: ['teamName'],
        include: [
          { model: Matches,
            as: 'homeTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] },
          { model: Matches,
            as: 'awayTeam',
            where: { inProgress: false },
            attributes: ['homeTeamGoals', 'awayTeamGoals'] }],
      },
    );
    const board = LeaderBoard.sortClassification(result, path);
    return board;
  };
}
