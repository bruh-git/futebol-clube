import ILeaderBoards from '../interfaces/ILeaderboards';

export default class LeaderBoard {
  static getLeaderBords(data: ILeaderBoards[], path: string) {
    const board = data.map((team: any) => ({
      name: team.teamName,
      totalPoints: LeaderBoard.totalPoints(team, path),
      totalGames: LeaderBoard.totalGames(team, path),
      totalVictories: LeaderBoard.totalVictories(team, path),
      totalDraws: LeaderBoard.totalDraws(team, path),
      totalLosses: LeaderBoard.totalLosses(team, path),
      goalsFavor: LeaderBoard.goalsFavor(team, path),
      goalsOwn: LeaderBoard.goalsOwn(team, path),
      goalsBalance: LeaderBoard.goalsBalance(team, path),
      efficiency: LeaderBoard.efficiency(team, path),
    }));

    return board;
  }

  static totalGames(
    teams: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    // o teams tem as chaves homeTeam e awayTeam
    // para cada chave(homeTeam/AwayTime)estou acessando o tamanho(length)do homeTeamGols/awayTeamGols
    const home = [
      ...teams.homeTeam.map((teamHome: any) => teamHome.homeTeamGoals),
    ].length;

    const away = [
      ...teams.awayTeam.map((teamAway: any) => teamAway.awayTeamGoals),
    ].length;
    // o if garante o retorno correto para caminho da url(/home ou /away)
    if (path === 'home') return home;
    if (path === 'away') return away;
    return home + away;
  }

  static totalVictories(teams: {
    homeTeam: ILeaderBoards[];
    awayTeam: ILeaderBoards[];
  }, path: string) {
    const homeVictorie = teams.homeTeam
      .reduce((victorie: any, teamHome: any) =>
        (teamHome.homeTeamGoals > teamHome.awayTeamGoals
          ? victorie + 1 : victorie + 0), 0);

    const awayVictorie = teams.awayTeam
      .reduce((victorie: any, teamAway: any) => (teamAway.awayTeamGoals > teamAway.homeTeamGoals
        ? victorie + 1 : victorie + 0), 0);

    switch (path) {
      // se for diferente de homeVictore/awayVictorie retorna 0, se não, retorne o total de vitorias homeVictorie/awayVictorie
      case 'home':
        return !homeVictorie ? 0 : homeVictorie;
      case 'away':
        return !awayVictorie ? 0 : awayVictorie;
      default:
        return homeVictorie + awayVictorie;
    }
  }

  static totalLosses(team: {
    homeTeam: ILeaderBoards[];
    awayTeam: ILeaderBoards[];
  }, path: string) {
    const homeLose = team.homeTeam
      .reduce((lose: any, teamHome: any) =>
        (teamHome.awayTeamGoals > teamHome.homeTeamGoals
          ? lose + 1 : lose + 0), 0);

    const awayLose = team.awayTeam
      .reduce((lose: any, awayTeam: any) => (awayTeam.homeTeamGoals > awayTeam.awayTeamGoals
        ? lose + 1 : lose + 0), 0);

    switch (path) {
      case 'home':
        return !homeLose ? 0 : homeLose;
      case 'away':
        return !awayLose ? 0 : awayLose;
      default:
        return homeLose + awayLose;
    }
  }

  static totalDraws(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    return LeaderBoard.totalGames(team, path)
      - (LeaderBoard.totalVictories(team, path)
        + LeaderBoard.totalLosses(team, path));
  }
  // total games retorna o total de gols de todos os jogos
  // total victories adciona mais uma vitoria ao time vencedor
  // total losses adciona mais uma derrota ao time perdedor
  // total games - (total vitories + total losses) = total de empates

  static goalsFavor(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    const homeGoals = team.homeTeam
      .reduce((accGoals: any, home: any) => accGoals + home.homeTeamGoals, 0);

    const awayGoals = team.awayTeam
      .reduce((accGoals: any, away: any) => accGoals + away.awayTeamGoals, 0);

    switch (path) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static goalsOwn(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    const homeGoals = team.homeTeam
      .reduce((accGoals: any, away: any) => accGoals + away.awayTeamGoals, 0);

    const awayGoals = team.awayTeam
      .reduce((accGoals: any, home: any) => accGoals + home.homeTeamGoals, 0);

    switch (path) {
      case 'home':
        return homeGoals;
      case 'away':
        return awayGoals;
      default:
        return homeGoals + awayGoals;
    }
  }

  static goalsBalance(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    const balance = LeaderBoard.goalsFavor(team, path)
      - LeaderBoard.goalsOwn(team, path);
    return balance;
  }

  static totalPoints(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    const winPoints = LeaderBoard.totalVictories(team, path) * 3;
    const drawPoints = LeaderBoard.totalDraws(team, path);
    return winPoints + drawPoints;
  }

  static efficiency(
    team: {
      homeTeam: ILeaderBoards[];
      awayTeam: ILeaderBoards[];
    },
    path: string,
  ) {
    const aproveitamento = ((LeaderBoard.totalPoints(team, path)
      / (LeaderBoard.totalGames(team, path) * 3)) * 100).toFixed(2);
    return aproveitamento;
  }
  // (P/(J*3)*100).toFixed(2)

  static sortClassification(team: any, path: string) {
    const order = LeaderBoard.getLeaderBords(team, path)
      .sort((a: ILeaderBoards, b: ILeaderBoards) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn);
    return order;
    // se a subtração dos valores resultarem em zero, pula para a proxima expressão até que a comparação seja efetuada.
  }
}
