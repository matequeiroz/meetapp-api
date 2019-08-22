import Sequelize, { Model } from 'sequelize';

/**
 * @class
 * @author Mateus Queiroz
 * This class is responsible for configuring the user model.
 */
class User extends Model {
  // This method is called by the sequelize itself.
  static init(sequelize) {
    super.init(
      // Fields powered by the app
      {
        name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'tb_users',
      }
    );
  }
}

export default User;
