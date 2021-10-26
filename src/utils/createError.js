import createError from 'http-errors';

export default (status, message) => {
  return createError(status, message);
};
