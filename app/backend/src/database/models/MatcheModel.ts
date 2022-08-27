import { INTEGER, Model, STRING, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
  homeTeamGoals!: number;
  awayTeamGoals!: number;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: STRING,
    allowNull: false,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  underscored: true,
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'home_team',
  targetKey: 'id',
  as: 'teamHome',
});
Matches.belongsTo(Teams, {
  foreignKey: 'away_team',
  targetKey: 'id',
  as: 'teamAway',
});
Teams.hasMany(Matches, {
  foreignKey: 'home_team',
  sourceKey: 'id',
  as: 'homeTeam',
});
Teams.hasMany(Matches, {
  foreignKey: 'away_team',
  sourceKey: 'id',
  as: 'awayTeam',
});

export default Matches;
