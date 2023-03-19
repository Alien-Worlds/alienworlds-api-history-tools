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

export class ExtendedActionTraceProcessor<DataType> extends ActionTraceProcessor<DataType> {
  constructor(
    mongoSource: MongoSource,
    protected leaderboard: LeaderboardService,
    protected atomicassets: AtomicAssetRepository,
    protected broadcast: BroadcastClient
  ) {
    super(mongoSource);
  }

  public async run(data: ProcessorTaskModel, sharedData: unknown): Promise<void> {
    this.input = ActionTraceProcessorInput.create<DataType>(data);
  }
}
