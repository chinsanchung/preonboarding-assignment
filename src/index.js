import App from './core/app';
import database from './core/database';

database().then(() => {
  App();
});
