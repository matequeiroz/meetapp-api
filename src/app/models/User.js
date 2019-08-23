import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

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
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'tb_users',
      }
    );
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      return this;
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
