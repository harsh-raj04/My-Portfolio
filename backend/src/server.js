import { app } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './db/mongoose.js';

async function bootstrap() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Portfolio API listening on port ${env.port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API', error);
  process.exit(1);
});

