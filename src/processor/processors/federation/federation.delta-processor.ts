import { log } from '@alien-worlds/api-core';
import {
  DeltaProcessor,
  ProcessorSharedData,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';

type ContractData = { [key: string]: unknown };

export default class FederationDeltaProcessor extends DeltaProcessor<ContractData> {
  public async run(
    model: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    try {
      await super.run(model, sharedData);
      
    } catch (error) {
      log(error);
      this.reject(error);
    }
  }
}
