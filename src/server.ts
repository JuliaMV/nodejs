import * as dotenv from 'dotenv';

import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});
