import passport from 'passport';

export default class AuthController {
  constructor() {}

  login(req, res, next) {
    console.log('start login');
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.log('Login Error:', authError);
        res.clearCookie('connect.sid');
        return res.status(403).send('로그인 인증에 에러가 발생했습니다.');
      }
      if (!user) {
        console.log('No User: ', info);
        res.clearCookie('connect.sid');
        return res.status(403).send(info.message);
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          res.clearCookie('connect.sid');
          return next(loginError);
        } else {
          console.log('Login Success');
          return res.send(`Login Success with ID: ${user?.id}`);
        }
      });
    })(req, res, next);
  }

  logout(req, res) {
    req.logout();
    req.session.destroy(() => {
      console.log('Start Logout');
      res.clearCookie('connect.sid');
      return res.send('Logout Success');
    });
  }
}
