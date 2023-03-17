import { LeaderboardServiceConfig, AtomicAssetsConfig } from '@alien-worlds/alienworlds-api-common';
import { MongoConfig } from '@alien-worlds/api-core';
export type ProcessorOptions = {
  threads: number;
};

export type ProcessorSharedData = {
  config: {
    mongo: MongoConfig,
    leaderboard: LeaderboardServiceConfig,
    atomicassets: AtomicAssetsConfig
  }
};
