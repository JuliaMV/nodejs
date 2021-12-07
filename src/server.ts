import * as dotenv from 'dotenv';

import app from './app';
import logger from './logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

process
  .on('unhandledRejection', () => {
    logger.log('error', 'Unhandled rejection detectet');
    process.exit(1);
  })
  .on('uncaughtException', (error) => {
    logger.log('error', `Captured error: ${error.message}`);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
