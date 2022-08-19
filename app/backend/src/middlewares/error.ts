import { ErrorRequestHandler } from 'express';

const error: ErrorRequestHandler = (err, _req, res, next) => {
  const { name, message, details } = err;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnprocessableEntityError':
      res.status(422).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.sendStatus(500).json({ message });
  }

  next();
};

export default error;
