import { BroadcastConfig, MongoConfig } from '@alien-worlds/api-core';
export type ProcessorOptions = {
  threads: number;
};

export type ProcessorSharedData = {
  config: {
    mongo: MongoConfig;
    broadcast: BroadcastConfig;
  };
};
