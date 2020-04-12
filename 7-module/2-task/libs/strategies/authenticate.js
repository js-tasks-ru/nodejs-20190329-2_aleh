const UserModel = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  try {
    if (!email || !displayName) {
      done(null, false, 'Не указан email');
      return;
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ email, displayName });
    }
    done(null, user);
  } catch (e) {
    done(e, false, 'Ошибка при создании пользователя');
  }
};
