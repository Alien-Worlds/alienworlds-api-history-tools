/* eslint-disable @typescript-eslint/no-unused-vars */

import { MongoSource } from '@alien-worlds/api-core';
import { ActionTraceProcessor } from '@alien-worlds/api-history-tools';
import { ProcessorSharedData } from '../processor.types';

export class ExtendedActionTraceProcessor<DataType> extends ActionTraceProcessor<
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
