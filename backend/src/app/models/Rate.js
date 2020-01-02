import Sequelize, { Model } from 'sequelize';

class Rate extends Model {
  static init(sequelize) {
    super.init(
      {
        origin: Sequelize.INTEGER,
        destiny: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }
}

export default Rate;
