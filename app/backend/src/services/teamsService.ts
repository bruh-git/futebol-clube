import Team from '../database/models/TeamModel';

export default class TeamsService {
  public list = async () => {
    const team = await Team.findAll();
    return team;
  };

  public findById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });
    return team;
  };
}
