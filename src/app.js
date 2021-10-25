import express, { json, urlencoded } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes';

export default () => {
  const App = express();
  const PORT = 5000;
  const COOKIE_SECRET = 'secret';
  // middlewares
  App.use((req, res, next) => {
    morgan('dev')(req, res, next);
  });
  App.use(cors());
  App.use(json());
  App.use(urlencoded({ extended: false }));
  App.use(cookieParser(COOKIE_SECRET));
  App.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: COOKIE_SECRET,
      cookie: { httpOnly: true, secure: false },
    })
  );

  // routes
  App.use('/', routes);

  App.listen(PORT, () => console.log(`Start server with PORT: ${PORT}`));
};
