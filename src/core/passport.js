import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import UserModel from '../models/users.model';

const LocalStrategy = passportLocal.Strategy;

const setDefaultConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user?.id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findOne({ id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};

const setLocalStrategy = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'password',
        session: true,
      },
      async (id, password, done) => {
        try {
          const user = await UserModel.findOne({ id });
          if (user) {
            const isCorrectPassword = await bcrypt.compare(
              password,
              user.password
            );
            if (isCorrectPassword) done(null, user);
            else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, {
              message: '회원 가입을 하지 않은 이메일입니다.',
            });
          }
        } catch (error) {
          console.log('passport error: ', error);
          done(error);
        }
      }
    )
  );
};

export default () => {
  setDefaultConfig();
  setLocalStrategy();
};
