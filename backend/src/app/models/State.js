import Sequelize, { Model } from 'sequelize';

class State extends Model {
  static init(sequelize) {
    super.init(
      {
        ddd: Sequelize.INTEGER,
        title: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default State;
