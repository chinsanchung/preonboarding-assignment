const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');

module.exports = () => {
  const App = express();
  const PORT = 5000;
  const COOKIE_SECRET = 'secret';
  // middlewares
  App.use((req, res, next) => {
    morgan('dev')(req, res, next);
  });
  App.use(cors());
  App.use(express.json());
  App.use(express.urlencoded({ extended: false }));
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
