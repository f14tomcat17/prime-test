import express from 'express';
import { default as axios } from 'axios';
import { WebApiErrors } from './web-api-errors.enum';

interface ApiQuotesData {}

interface ApiQuotesResponse {
  data: ApiQuotesData;
}

export default function (req: express.Request, res: express.Response): void {
  getQuotes(req.headers.authorization ?? '', req.query['quoteKey'] as string, req.query['fields'] as string)
    .then((quotes_res: ApiQuotesResponse) => res.json(quotes_res.data))
    .catch((err: { error: string }) => {
      console.error(err);
      res.status(WebApiErrors.NO_TOKEN ? 400 : 500).json(err);
    });
}

function getQuotes(authorization: string, quoteKey: string, fields: string): Promise<any> {
  if (!authorization) {
    return Promise.reject({ error: WebApiErrors.NO_TOKEN });
  }
  if (!process.env['API_URL']) {
    return Promise.reject({ error: WebApiErrors.NO_API_URL });
  }
  return axios.get(`${process.env['API_URL']}/quotes/${quoteKey}?fields=${fields}`, {
    headers: {
      'Authorization': authorization
    }
  });
}
