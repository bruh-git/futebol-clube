'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.createTable('matches', {
    id: { 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      field: 'home_team',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'home_team_goals',
    },
    awayTeam: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      field: 'away_team',
      onDelete: 'CASCADE',
    },
    awayTeamGoals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      field: 'in_progress',
    },
  });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};