const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    function(email, password, done) {
        (async () => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    done(null, false, 'Нет такого пользователя');
                    return;
                }
                const isPasswordValid = await user.checkPassword(password);
                if (!isPasswordValid) {
                    done(null, false, 'Невереный пароль');
                } else {
                    done(null, user);
                }
            } catch (e) {
                done(e, false, 'Ошибка сервера при проверке пароля');
            }
        })()
    }
);
