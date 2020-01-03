import Sequelize, { Model } from 'sequelize';

class Rate extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.State, { foreignKey: 'origin_id', as: 'origin' });
    this.belongsTo(models.State, { foreignKey: 'destiny_id', as: 'destiny' });
  }
}

export default Rate;
