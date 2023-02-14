import { buildConfig } from './../config/config';
import { startBroadcastServer } from '@alien-worlds/api-history-tools';

const start = () => {
  const config = buildConfig();
  startBroadcastServer(config.broadcast);
};

start();
