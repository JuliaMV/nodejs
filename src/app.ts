import express from 'express';
import cors from 'cors';

import { apiRouter } from './api';
import dbInit from './db/init';
import { migrateAll } from './db/umzug';
import { logRequestInfo } from './middlewares';

dbInit()
  .then(migrateAll)
  .then(() => 'DB initialized and all migrations and seeds completed!')
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', logRequestInfo, apiRouter);

export default app;
