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

const matchesTeamsMock = [
  {
    id: 7,
    homeTeam: 5,
    homeTeamGoals: 10,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Cruzeiro',
    },
    teamAway: {
      teamName: 'Atletico',
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'America',
    },
    teamAway: {
      teamName: 'Flemengo',
    },
  },
] as unknown as IMatch[];

const matchesTeamsMockFalse = [
  {
    id: 7,
    homeTeam: 5,
    homeTeamGoals: 10,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'Cruzeiro',
    },
    teamAway: {
      teamName: 'Atletico',
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'America',
    },
    teamAway: {
      teamName: 'Flemengo',
    },
  },
] as unknown as IMatch[];

const matchesTeamsMockTrue = [
  {
    id: 7,
    homeTeam: 5,
    homeTeamGoals: 10,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: 'Cruzeiro',
    },
    teamAway: {
      teamName: 'Atletico',
    },
  },
  {
    id: 41,
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 9,
    awayTeamGoals: 0,
    inProgress: true,
    teamHome: {
      teamName: 'America',
    },
    teamAway: {
      teamName: 'Flamengo',
    },
  },
] as unknown as IMatch[];
const mockCreationMatches = {
  homeTeam: 3,
  awayTeam: 2,
  homeTeamGoals: 4,
  awayTeamGoals: 1,
};
const mockCreate = {
  id: 1,
  homeTeam: 3,
  awayTeam: 2,
  homeTeamGoals: 4,
  awayTeamGoals: 1,
  inProgress: true,
};
const mockIdError = {
  id: 9,
  homeTeam: '',
  awayTeam: '',
  homeTeamGoals: 4,
  awayTeamGoals: 1,
  inProgress: true,
};

const mockCreationsError = {
  homeTeam: 0,
  awayTeam: 1,
  homeTeamGoals: 4,
  awayTeamGoals: 1,
};
const mockCreationMatchesError = {
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 4,
  awayTeamGoals: 1,
};
const mockCreateError = {
  id: 1,
  homeTeam: 1,
  awayTeam: 1,
  homeTeamGoals: 4,
  awayTeamGoals: 1,
  inProgress: true,
};
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

export {
  loginMock, userMock, errorLoginMock, userNotAuthMock, matchesMock, teamsMock,
  leaderBoardMock, leaderBoardHomeMock, mockCreationMatches,
  mockCreate, matchesTeamsMock, matchesTeamsMockFalse,
  matchesTeamsMockTrue, mockCreationMatchesError, mockCreateError, mockIdError,
  mockCreationsError,
};
