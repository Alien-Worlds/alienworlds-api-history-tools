import { log } from '@alien-worlds/api-core';
import { DeltaProcessorInput, ProcessorTaskModel } from '@alien-worlds/api-history-tools';
import { ExtendedDeltaProcessor } from '../extended-delta.processor';

type ContractData = { [key: string]: unknown };

export default class AwlndratingsDeltaProcessor extends ExtendedDeltaProcessor<ContractData> {
  public async run(model: ProcessorTaskModel): Promise<void> {
    try {
      this.input = DeltaProcessorInput.create(model);
      this.resolve();
    } catch (error) {
      log(error);
      this.reject(error);
    }
  }
}
