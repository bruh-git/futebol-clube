import Teams from '../database/models/TeamModel';
import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import IMatch from '../interfaces/IMatch';

const loginMock: ILogin = {
  email: 'admin@admin.com',
  password: '123456',
};

const userMock: IUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const errorLoginMock = {
  email: '',
  password: 'senhaerrada',
};

const userNotAuthMock = {
  email: 'teste@teste.com',
  password: 'senhaerrada',
};

const matchesMock = [
  {
    id: 0,
    homeTeam: 0,
    homeTeamGoals: 3,
    awayTeam: 1,
    awayTeamGoals: 2,
    inProgress: false,
  },
  {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 7,
    awayTeam: 2,
    awayTeamGoals: 1,
    inProgress: false,
  },
] as IMatch[];

const teamsMock = ([
  { id: 0, teamName: 'Cruzeiro' },
  { id: 1, teamName: 'Atlético' },
] as Teams[]);

export { loginMock, userMock, errorLoginMock, userNotAuthMock, matchesMock, teamsMock };
