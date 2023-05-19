import { MongoSource } from '@alien-worlds/api-core';
import {
  DefaultWorkerLoader,
  Worker,
  WorkerContainer,
} from '@alien-worlds/api-history-tools';
import { ProcessorSharedData } from './processor.types';
import { ProcessorLabel } from './processor.labels';
import AlienWorldsActionProcessor from './processors/alien-worlds/alien-worlds.action-processor';
import AlienWorldsDeltaProcessor from './processors/alien-worlds/alien-worlds.delta-processor';
import AwlndratingsActionProcessor from './processors/awlndratings/awlndratings.action-processor';
import AwlndratingsDeltaProcessor from './processors/awlndratings/awlndratings.delta-processor';
import BoostWorldsActionProcessor from './processors/boost-worlds/boost-worlds.action-processor';
import BoostWorldsDeltaProcessor from './processors/boost-worlds/boost-worlds.delta-processor';
import FederationActionProcessor from './processors/federation/federation.action-processor';
import FederationDeltaProcessor from './processors/federation/federation.delta-processor';
import MFederationActionProcessor from './processors/m-federation/m-federation.action-processor';
import MFederationDeltaProcessor from './processors/m-federation/m-federation.delta-processor';
import NftmtWorldsActionProcessor from './processors/nftmt-worlds/nftmt-worlds.action-processor';
import NftmtWorldsDeltaProcessor from './processors/nftmt-worlds/nftmt-worlds.delta-processor';
import NotifyWorldActionProcessor from './processors/notify-world/notify-world.action-processor';
import NotifyWorldDeltaProcessor from './processors/notify-world/notify-world.delta-processor';
import OtherWorldsActionProcessor from './processors/other-worlds/other-worlds.action-processor';
import OtherWorldsDeltaProcessor from './processors/other-worlds/other-worlds.delta-processor';
import PtpxyWorldsActionProcessor from './processors/ptpxy-worlds/ptpxy-worlds.action-processor';
import PtpxyWorldsDeltaProcessor from './processors/ptpxy-worlds/ptpxy-worlds.delta-processor';
import SFederationActionProcessor from './processors/s-federation/s-federation.action-processor';
import SFederationDeltaProcessor from './processors/s-federation/s-federation.delta-processor';
import UsptsWorldsActionProcessor from './processors/uspts-worlds/uspts-worlds.action-processor';
import UsptsWorldsDeltaProcessor from './processors/uspts-worlds/uspts-worlds.delta-processor';

export default class ProcessorWorkerLoader extends DefaultWorkerLoader {
  private container = new WorkerContainer();
  private mongoSource: MongoSource;

  public async setup(sharedData: ProcessorSharedData): Promise<void> {
    super.setup(sharedData);
    const {
      config: { mongo },
    } = sharedData;

    this.mongoSource = await MongoSource.create(mongo);

    // 'alien.worlds'
    this.container.bind(
      ProcessorLabel.AlienWorldsActionProcessor,
      AlienWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.AlienWorldsDeltaProcessor,
      AlienWorldsDeltaProcessor
    );
    // 'uspts.worlds'
    this.container.bind(
      ProcessorLabel.UsptsWorldsActionProcessor,
      UsptsWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.UsptsWorldsDeltaProcessor,
      UsptsWorldsDeltaProcessor
    );
    // 'm.federation'
    this.container.bind(
      ProcessorLabel.MFederationActionProcessor,
      MFederationActionProcessor
    );
    this.container.bind(
      ProcessorLabel.MFederationDeltaProcessor,
      MFederationDeltaProcessor
    );
    // 'federation'
    this.container.bind(
      ProcessorLabel.FederationActionProcessor,
      FederationActionProcessor
    );
    this.container.bind(
      ProcessorLabel.FederationDeltaProcessor,
      FederationDeltaProcessor
    );
    // 's.federation'
    this.container.bind(
      ProcessorLabel.SFederationActionProcessor,
      SFederationActionProcessor
    );
    this.container.bind(
      ProcessorLabel.SFederationDeltaProcessor,
      SFederationDeltaProcessor
    );
    // 'other.worlds'
    this.container.bind(
      ProcessorLabel.OtherWorldsActionProcessor,
      OtherWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.OtherWorldsDeltaProcessor,
      OtherWorldsDeltaProcessor
    );
    // 'boost.worlds'
    this.container.bind(
      ProcessorLabel.BoostWorldsActionProcessor,
      BoostWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.BoostWorldsDeltaProcessor,
      BoostWorldsDeltaProcessor
    );
    // 'ptpxy.worlds'
    this.container.bind(
      ProcessorLabel.PtpxyWorldsActionProcessor,
      PtpxyWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.PtpxyWorldsDeltaProcessor,
      PtpxyWorldsDeltaProcessor
    );
    // 'nftmt.worlds'
    this.container.bind(
      ProcessorLabel.NftmtWorldsActionProcessor,
      NftmtWorldsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.NftmtWorldsDeltaProcessor,
      NftmtWorldsDeltaProcessor
    );
    // 'notify.world'
    this.container.bind(
      ProcessorLabel.NotifyWorldActionProcessor,
      NotifyWorldActionProcessor
    );
    this.container.bind(
      ProcessorLabel.NotifyWorldDeltaProcessor,
      NotifyWorldDeltaProcessor
    );
    // 'awlndratings'
    this.container.bind(
      ProcessorLabel.AwlndratingsActionProcessor,
      AwlndratingsActionProcessor
    );
    this.container.bind(
      ProcessorLabel.AwlndratingsDeltaProcessor,
      AwlndratingsDeltaProcessor
    );
  }

  public async load(pointer: string) {
    const { mongoSource, sharedData } = this;
    const Class = this.container.get(pointer);
    const worker: Worker = new Class({
      mongoSource,
      sharedData,
    }) as Worker;
    return worker;
  }
}
