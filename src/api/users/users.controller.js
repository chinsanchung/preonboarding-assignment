import MovieService from './users.service';

export default class UserController {
  movieService = new MovieService();
  constructor() {
    this.join = this.join.bind(this);
  }
  async join(req, res) {
    try {
      const { id, password } = req.body;
      console.log('req.', req.body);
      await this.movieService.join({
        id,
        password,
      });
      res.send('success');
      return;
    } catch (error) {
      res.status(error.status).send(error.message);
      return;
    }
  }
}
