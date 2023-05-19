import {
  ContractAction,
  ContractUnkownDataEntity,
  DataSourceOperationError,
  log,
} from '@alien-worlds/api-core';
import {
  ActionTraceProcessorInput,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';
import { AlienWorldsContract } from '@alien-worlds/alienworlds-api-common';
import { ExtendedActionTraceProcessor } from '../extended-action-trace.processor';

type ContractData = { [key: string]: unknown };

export default class AlienWorldsActionProcessor extends ExtendedActionTraceProcessor<ContractData> {
  public async run(model: ProcessorTaskModel): Promise<void> {
    try {
      this.input = ActionTraceProcessorInput.create(model);
      const { Ioc, AlienWorldsActionName, Entities } = AlienWorldsContract.Actions;
      const { input, mongoSource } = this;
      const {
        blockNumber,
        blockTimestamp,
        account,
        name,
        recvSequence,
        globalSequence,
        transactionId,
        data,
      } = input;
      const contractModel = {
        blockNumber,
        blockTimestamp,
        account,
        name,
        receiverSequence: recvSequence,
        globalSequence,
        transactionId,
        data: null,
      };

      const repository = await Ioc.setupAlienWorldsActionRepository(mongoSource);

      if (name === AlienWorldsActionName.Addvesting) {
        contractModel.data = Entities.AddVesting.fromStruct(
          <AlienWorldsContract.Actions.Types.AddvestingStruct>data
        );
      } else if (name === AlienWorldsActionName.Burn) {
        contractModel.data = Entities.Burn.fromStruct(
          <AlienWorldsContract.Actions.Types.BurnStruct>data
        );
      } else if (name === AlienWorldsActionName.Close) {
        contractModel.data = Entities.Close.fromStruct(
          <AlienWorldsContract.Actions.Types.CloseStruct>data
        );
      } else if (name === AlienWorldsActionName.Create) {
        contractModel.data = Entities.Create.fromStruct(
          <AlienWorldsContract.Actions.Types.CreateStruct>data
        );
      } else if (name === AlienWorldsActionName.Issue) {
        contractModel.data = Entities.Issue.fromStruct(
          <AlienWorldsContract.Actions.Types.IssueStruct>data
        );
      } else if (name === AlienWorldsActionName.Open) {
        contractModel.data = Entities.Open.fromStruct(
          <AlienWorldsContract.Actions.Types.OpenStruct>data
        );
      } else if (name === AlienWorldsActionName.Transfer) {
        contractModel.data = Entities.Transfer.fromStruct(
          <AlienWorldsContract.Actions.Types.TransferStruct>data
        );
      } else {
        /*
        In the case of an action (test or former etc.) that is not included in the current ABI and 
        for which we do not have defined types, we must save the object in its primary form.
        */
        contractModel.data = ContractUnkownDataEntity.create(data);
      }

      const result = await repository.add(ContractAction.create(contractModel));

      if (result.isFailure) {
        const {
          failure: { error },
        } = result;
        if ((<DataSourceOperationError>error).isDuplicateError) {
          log(`Resolving a task containing duplicate documents: ${error.message}`);
          this.resolve(contractModel);
        } else {
          log(error);
          this.reject(error);
        }
      } else {
        this.resolve(result.content);
      }
    } catch (error) {
      log(error);
      this.reject(error);
    }
  }
}
