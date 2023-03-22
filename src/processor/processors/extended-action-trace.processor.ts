/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AtomicAssetRepository,
  LeaderboardService,
} from '@alien-worlds/alienworlds-api-common';
import { BroadcastClient, MongoSource } from '@alien-worlds/api-core';
import {
  ActionTraceProcessor,
  ActionTraceProcessorInput,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';
import { ExtendedLeaderboardServiceConfig } from '../../config/config';
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
      updateLeaderboards(blockNumber, blockTimestamp, sharedData);
    }
  }

  public async run(
    data: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    this.input = ActionTraceProcessorInput.create<DataType>(data);
  }
}
