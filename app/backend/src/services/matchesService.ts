import Teams from '../database/models/TeamModel';
import Matches from '../database/models/MatcheModel';

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
}
