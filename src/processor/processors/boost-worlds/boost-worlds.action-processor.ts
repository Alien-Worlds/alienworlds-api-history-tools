import { log } from '@alien-worlds/api-core';
import {
  ActionTraceProcessorInput,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';
import { ExtendedActionTraceProcessor } from '../extended-action-trace.processor';

type ContractData = { [key: string]: unknown };

export default class BoostWorldsActionProcessor extends ExtendedActionTraceProcessor<ContractData> {
  public async run(model: ProcessorTaskModel): Promise<void> {
    try {
      this.input = ActionTraceProcessorInput.create(model);
      this.resolve();
    } catch (error) {
      log(error);
      this.reject(error);
    }
  }
}
