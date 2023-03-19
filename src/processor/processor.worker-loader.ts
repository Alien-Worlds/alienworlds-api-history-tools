import {
  AtomicAssetRepository,
  LeaderboardService,
  setupAtomicAssetRepository,
  setupLeaderboardService,
} from '@alien-worlds/alienworlds-api-common';
import { Broadcast, BroadcastClient, MongoSource } from '@alien-worlds/api-core';
import { DefaultWorkerLoader } from '@alien-worlds/api-history-tools';
import { AlienWorldsBroadcastClient } from '../internal-broadcast/internal-broadcast.enums';
import { ProcessorSharedData } from './processor.types';

export default class MyProcessorWorkerLoader extends DefaultWorkerLoader {
  private mongoSource: MongoSource;
  private leaderboard: LeaderboardService;
  private atomicassets: AtomicAssetRepository;
  private broadcast: BroadcastClient;

  public async setup(sharedData: ProcessorSharedData): Promise<void> {
    const {
      config: { mongo, leaderboard, atomicassets, broadcast },
    } = sharedData;
    this.mongoSource = await MongoSource.create(mongo);
    this.leaderboard = await setupLeaderboardService(leaderboard.api, this.mongoSource);
    this.atomicassets = await setupAtomicAssetRepository(
      atomicassets.api,
      this.mongoSource
    );
    this.broadcast = await Broadcast.createClient({
      ...broadcast,
      clientName: AlienWorldsBroadcastClient.Processor,
    });

    this.broadcast.connect();
  }

  public async load(pointer: string, containerPath: string) {
    const { mongoSource, leaderboard, atomicassets, broadcast } = this;
    return super.load(
      pointer,
      containerPath,
      mongoSource,
      leaderboard,
      atomicassets,
      broadcast
    );
  }
}
