import { MFederationContract } from '@alien-worlds/alienworlds-api-common';
import {
  ContractAction,
  ContractUnkownDataEntity,
  DataSourceOperationError,
  log,
} from '@alien-worlds/api-core';
import {
  ActionTraceProcessor,
  ProcessorSharedData,
  ProcessorTaskModel,
} from '@alien-worlds/api-history-tools';

type ContractData = { [key: string]: unknown };

export default class MFederationActionProcessor extends ActionTraceProcessor<ContractData> {
  public async run(
    model: ProcessorTaskModel,
    sharedData: ProcessorSharedData
  ): Promise<void> {
    try {
      await super.run(model, sharedData);
      const { Ioc, MFederationActionName, Entities } = MFederationContract.Actions;
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

      const repository = await Ioc.setupMFederationActionRepository(mongoSource);
      if (name === MFederationActionName.ClaimMines) {
        contractModel.data = Entities.ClaimMine.fromStruct(
          <MFederationContract.Actions.Types.ClaimminesStruct>data
        );
      } else if (name === MFederationActionName.Mine) {
        contractModel.data = Entities.Mine.fromStruct(
          <MFederationContract.Actions.Types.MineStruct>data
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
