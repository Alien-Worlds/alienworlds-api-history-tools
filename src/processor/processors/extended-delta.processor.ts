/* eslint-disable @typescript-eslint/no-unused-vars */

import { MongoSource } from '@alien-worlds/api-core';
import { DeltaProcessor } from '@alien-worlds/api-history-tools';
import { ProcessorSharedData } from '../processor.types';

export class ExtendedDeltaProcessor<DataType> extends DeltaProcessor<
  DataType,
  ProcessorSharedData
> {
  protected mongoSource: MongoSource;

  constructor(components: { mongoSource: MongoSource; sharedData: ProcessorSharedData }) {
    super();
    const { mongoSource, sharedData } = components;
    this.sharedData = sharedData;
    this.mongoSource = mongoSource;
  }
}
