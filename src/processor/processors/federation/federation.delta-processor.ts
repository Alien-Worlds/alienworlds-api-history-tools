import { FederationContract } from '@alien-worlds/alienworlds-api-common';
import {
  ContractDelta,
  ContractUnkownDataEntity,
  DataSourceOperationError,
  log,
} from '@alien-worlds/api-core';
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
      const { input, mongoSource } = this;
      const { Ioc, FederationTableName, Entities } = FederationContract.Deltas;
      const {
        blockNumber,
        blockTimestamp,
        table,
        scope,
        code,
        payer,
        present,
        primaryKey,
        data,
      } = input;

      const deltaModel = {
        id: '',
        blockNumber,
        code,
        scope,
        table,
        payer,
        primaryKey,
        present,
        blockTimestamp,
        data: null,
      };

      const repository = await Ioc.setupFederationDeltaRepository(mongoSource);

      if (table === FederationTableName.Players) {
        deltaModel.data = Entities.Player.fromStruct(data);
      } else {
        /*
        In the case of an table (test or former etc.) that is not included in the current ABI and 
        for which we do not have defined types, we must save the object in its primary form.
        */
        deltaModel.data = ContractUnkownDataEntity.create(data);
      }

      const result = await repository.add(ContractDelta.create(deltaModel));

      if (result.isFailure) {
        const {
          failure: { error },
        } = result;
        if ((<DataSourceOperationError>error).isDuplicateError) {
          log(`Resolving a task containing duplicate documents: ${error.message}`);
          this.resolve(deltaModel);
        } else {
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
