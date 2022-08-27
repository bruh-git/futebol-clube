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

const leaderBoardMock = [
  {
    name: 'Palmeiras',
    totalPoints: 13,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 17,
    goalsOwn: 5,
    goalsBalance: 12,
    efficiency: '86.67',
  },
  {
    name: 'Corinthians',
    totalPoints: 12,
    totalGames: 5,
    totalVictories: 4,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 12,
    goalsOwn: 3,
    goalsBalance: 9,
    efficiency: '80.00',
  },
];

const leaderBoardHomeMock = [
  {
    name: 'Santos',
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: '100.00',
  },
  {
    name: 'Palmeiras',
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 10,
    goalsOwn: 5,
    goalsBalance: 5,
    efficiency: '77.78',
  },
];

const leaderBoardAwayMock = [
  {
    name: 'Palmeiras',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 0,
    goalsBalance: 7,
    efficiency: '100.00',
  },
  {
    name: 'Corinthians',
    totalPoints: 6,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 2,
    goalsBalance: 4,
    efficiency: '66.67',
  },
];

export {
  loginMock, userMock, errorLoginMock,
  userNotAuthMock, matchesMock, teamsMock,
  leaderBoardMock, leaderBoardHomeMock,
  leaderBoardAwayMock,
};
