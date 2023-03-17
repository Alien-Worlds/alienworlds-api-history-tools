import {
  AtomicAssetRepository,
  LeaderboardService,
  setupAtomicAssetRepository,
  setupLeaderboardService,
} from '@alien-worlds/alienworlds-api-common';
import { MongoSource } from '@alien-worlds/api-core';
import { DefaultWorkerLoader } from '@alien-worlds/api-history-tools';
import { ProcessorSharedData } from './processor.types';

export default class MyProcessorWorkerLoader extends DefaultWorkerLoader {
  private mongoSource: MongoSource;
  private leaderboard: LeaderboardService;
  private atomicassets: AtomicAssetRepository;

  public async setup(sharedData: ProcessorSharedData): Promise<void> {
    const {
      config: { mongo, leaderboard, atomicassets },
    } = sharedData;
    this.mongoSource = await MongoSource.create(mongo);
    this.leaderboard = await setupLeaderboardService(leaderboard.api, this.mongoSource);
    this.atomicassets = await setupAtomicAssetRepository(
      atomicassets.api,
      this.mongoSource
    );
  }

  public async load(pointer: string, containerPath: string) {
    const { mongoSource, leaderboard, atomicassets } = this;
    return super.load(pointer, containerPath, mongoSource, leaderboard, atomicassets);
  }
}
