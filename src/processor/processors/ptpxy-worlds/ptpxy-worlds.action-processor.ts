import { log } from '@alien-worlds/api-core';
import {
  ActionTraceProcessor,
  ProcessorSharedData,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';

type ContractData = { [key: string]: unknown };

export default class PtpxyWorldsActionProcessor extends ActionTraceProcessor<ContractData> {
  public async run(
    model: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    try {
      await super.run(model, sharedData);
      
  } catch (error){
    log(error);
    this.reject(error);
  }
}
}
