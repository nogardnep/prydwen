import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length'
  );
  next();
});

app.use(
  '/' + config.apiRoot + '/' + config.routes.project,
  require('./routes/project.routes')
);
app.use(
  '/' + config.apiRoot + '/' + config.routes.explorer,
  require('./routes/explorer.routes')
);
// TODO: delete?
// app.use(
//   '/' + config.apiRoot + '/' + config.routes.resource,
//   require('./routes/resource.routes')
// );
app.use(
  '/' + config.apiRoot + '/' + config.routes.configuration,
  require('./routes/configuration.routes')
);
app.use(
  '/' + config.apiRoot + '/' + config.routes.file,
  require('./routes/file.routes')
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});

app.listen(config.backendPort, () => {
  console.log('app listening on port ' + config.backendPort);
});

module.exports = app;
