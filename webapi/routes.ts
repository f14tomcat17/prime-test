import { Router } from 'express';
import quotes from './quotes';
import token from './token';
import bodyParser from 'body-parser';

export default function (): Router {
  const router = Router();

  router.post('/token', bodyParser.json(), token);
  router.get('/quotes', quotes);

  return router;
}
