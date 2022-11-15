import express from 'express';
import { default as axios } from 'axios';
import { WebApiErrors } from './web-api-errors.enum';

interface ApiTokenResponse extends express.Response {
  data: ApiTokenData;
}

interface ApiTokenData {
  access_token: string;
  refresh_token: string;
  scope: 'uaa.admin' | 'uaa.user';
  token_type: 'bearer';
}

export default function (req: express.Request, res: express.Response): void {
  getAuthToken(req.body.username, req.body.password)
    .then((tokenResponse: ApiTokenResponse) => res.json({ access_token: tokenResponse.data.access_token, refresh_token: tokenResponse.data.refresh_token }))
    .catch((err: any) => {
      console.error(err);
      if ('error' in err) {
        res.status(500).json(err);
        return;
      }
      res.status(err.response.status).json({ error: 'authentication error' });
    });
}

function getAuthToken(username: string, password: string): Promise<any> {
  if (!process.env['API_URL']) {
    return Promise.reject({ error: WebApiErrors.NO_API_URL });
  }
  const token = Buffer.from(`${process.env['CLIENT_ID']}:${process.env['CLIENT_PASSWORD']}`).toString('base64');
  return axios.post(`${process.env['API_URL']}/oauth/token?grant_type=password&username=${username}&password=${password}&scope=uaa.user`, {}, { headers: {
    'Authorization': `Basic ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }});
}
