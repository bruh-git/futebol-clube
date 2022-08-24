import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatcheModel';
import IMatch from '../interfaces/IMatch';

export default class TeamsService {
  public list = async () => {
    const matches = await Matches.findAll(({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }));
    return matches;
  };

  public filterByQuery = async () => {
    const matches = await Matches.findAll(
      {
        where: { inProgress: true },
        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );

    return matches;
  };

  public create = async (partida: IMatch) => {
    const matches = await Matches.create(partida);
    return matches;
  };

  public finish = async (id: number) => {
    await Matches.update(
      { inProgress: false },
      { where: { id } },
    );
  };

  public update = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    await Matches.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
  };
}
