import * as express from 'express';
import { categories, cities, schemas } from './mocks';

const API_VERSION = 'v1';
const PREFIX = 'api';

const app: express.Express = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction ) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* Routes */
app.get(`/${PREFIX}/${API_VERSION}/categories/`, (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(categories));
});

app.get(`/${PREFIX}/${API_VERSION}/cities/`, (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify(cities));
});

app.get(`/${PREFIX}/${API_VERSION}/categories/:uid/`, (req: express.Request, res: express.Response) => {
  const schema: any = schemas[req.params.uid];
  res.send(JSON.stringify(schema));
});

app.post(`/${PREFIX}/${API_VERSION}/travels/create/`, (req: express.Request, res: express.Response) => {
  res.send(JSON.stringify({ message: 'Successfully created' }));
});

app.listen(3000, () => {
  console.info('Mock api server is listening on 3000 port...');
});
