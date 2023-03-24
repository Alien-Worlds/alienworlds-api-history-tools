/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AtomicAssetRepository,
  LeaderboardService,
  LeaderboardUpdateStruct,
} from '@alien-worlds/alienworlds-api-common';
import { BroadcastClient, MongoSource } from '@alien-worlds/api-core';
import {
  ActionTraceProcessor,
  ActionTraceProcessorInput,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';
import { ExtendedLeaderboardServiceConfig } from '../../config';
import { LeaderboardUpdateBackupRepository } from '../leaderboard/leaderboard-update-backup.repository';
import { updateLeaderboards } from '../leaderboard/leaderboard.utils';
import { ProcessorSharedData } from '../processor.types';

export class ExtendedActionTraceProcessor<
  DataType
> extends ActionTraceProcessor<DataType> {
  constructor(
    mongoSource: MongoSource,
    protected leaderboard: LeaderboardService,
    protected atomicassets: AtomicAssetRepository,
    protected broadcast: BroadcastClient
  ) {
    super(mongoSource);
  }

  protected async sendLeaderboard(
    blockNumber: bigint,
    blockTimestamp: Date,
    sharedData: ProcessorSharedData
  ) {
    const { leaderboard, config } = sharedData;
    const { batchSize } = config.leaderboard as ExtendedLeaderboardServiceConfig;

    if ((batchSize > 0 && leaderboard.length >= batchSize) || batchSize === 0) {
      updateLeaderboards(
        blockNumber,
        blockTimestamp,
        sharedData,
        (structs: LeaderboardUpdateStruct[]) => {
          //
          const repository = new LeaderboardUpdateBackupRepository(this.mongoSource);
          repository.addMany(structs);
        }
      );
    }
  }

  public async run(
    data: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    this.input = ActionTraceProcessorInput.create<DataType>(data);
  }
}
