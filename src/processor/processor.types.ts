import {
  LeaderboardServiceConfig,
  AtomicAssetsConfig,
  NotifyWorldContract,
  UsptsWorldsContract,
  FederationContract,
} from '@alien-worlds/alienworlds-api-common';
import { BroadcastConfig, MongoConfig } from '@alien-worlds/api-core';
export type ProcessorOptions = {
  threads: number;
};

export type ProcessorSharedData = {
  config: {
    mongo: MongoConfig;
    leaderboard: LeaderboardServiceConfig;
    atomicassets: AtomicAssetsConfig;
    broadcast: BroadcastConfig;
  };
  leaderboard: (
    | NotifyWorldContract.Actions.Types.LogmineStruct
    | UsptsWorldsContract.Actions.Types.AddpointsStruct
    | FederationContract.Actions.Types.SettagStruct
  )[];
};
