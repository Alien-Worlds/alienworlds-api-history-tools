import { log } from '@alien-worlds/api-core';
import {
  DeltaProcessor,
  ProcessorSharedData,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';

type ContractData = { [key: string]: unknown };

export default class BoostWorldsDeltaProcessor extends DeltaProcessor<ContractData> {
  public async run(
    model: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    try {
      await super.run(model, sharedData);
      this.resolve();
    } catch (error) {
      log(error);
      this.reject(error);
    }
  }
}
