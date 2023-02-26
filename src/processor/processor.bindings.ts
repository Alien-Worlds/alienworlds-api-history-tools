import { WorkerContainer } from '@alien-worlds/api-history-tools';
import { ProcessorLabel } from './processor.labels';
import AlienWorldsActionProcessor from './processors/alien-worlds/alien-worlds.action-processor';
import AlienWorldsDeltaProcessor from './processors/alien-worlds/alien-worlds.delta-processor';
import UsptsWorldsActionProcessor from './processors/uspts-worlds/uspts-worlds.action-processor';
import UsptsWorldsDeltaProcessor from './processors/uspts-worlds/uspts-worlds.delta-processor';
import MFederationActionProcessor from './processors/m-federation/m-federation.action-processor';
import MFederationDeltaProcessor from './processors/m-federation/m-federation.delta-processor';
import FederationActionProcessor from './processors/federation/federation.action-processor';
import FederationDeltaProcessor from './processors/federation/federation.delta-processor';
import SFederationActionProcessor from './processors/s-federation/s-federation.action-processor';
import SFederationDeltaProcessor from './processors/s-federation/s-federation.delta-processor';
import AwlndratingsActionProcessor from './processors/awlndratings/awlndratings.action-processor';
import AwlndratingsDeltaProcessor from './processors/awlndratings/awlndratings.delta-processor';
import BoostWorldsActionProcessor from './processors/boost-worlds/boost-worlds.action-processor';
import BoostWorldsDeltaProcessor from './processors/boost-worlds/boost-worlds.delta-processor';
import NftmtWorldsActionProcessor from './processors/nftmt-worlds/nftmt-worlds.action-processor';
import NftmtWorldsDeltaProcessor from './processors/nftmt-worlds/nftmt-worlds.delta-processor';
import OtherWorldsActionProcessor from './processors/other-worlds/other-worlds.action-processor';
import OtherWorldsDeltaProcessor from './processors/other-worlds/other-worlds.delta-processor';
import PtpxyWorldsActionProcessor from './processors/ptpxy-worlds/ptpxy-worlds.action-processor';
import PtpxyWorldsDeltaProcessor from './processors/ptpxy-worlds/ptpxy-worlds.delta-processor';
import NotifyWorldActionProcessor from './processors/notify-world/notify-world.action-processor';
import NotifyWorldDeltaProcessor from './processors/notify-world/notify-world.delta-processor';

const container = new WorkerContainer();

// 'alien.worlds'
container.bind(ProcessorLabel.AlienWorldsActionProcessor, AlienWorldsActionProcessor);
container.bind(ProcessorLabel.AlienWorldsDeltaProcessor, AlienWorldsDeltaProcessor);
// 'uspts.worlds'
container.bind(ProcessorLabel.UsptsWorldsActionProcessor, UsptsWorldsActionProcessor);
container.bind(ProcessorLabel.UsptsWorldsDeltaProcessor, UsptsWorldsDeltaProcessor);
// 'm.federation'
container.bind(ProcessorLabel.MFederationActionProcessor, MFederationActionProcessor);
container.bind(ProcessorLabel.MFederationDeltaProcessor, MFederationDeltaProcessor);
// 'federation'
container.bind(ProcessorLabel.FederationActionProcessor, FederationActionProcessor);
container.bind(ProcessorLabel.FederationDeltaProcessor, FederationDeltaProcessor);
// 's.federation'
container.bind(ProcessorLabel.SFederationActionProcessor, SFederationActionProcessor);
container.bind(ProcessorLabel.SFederationDeltaProcessor, SFederationDeltaProcessor);
// 'other.worlds'
container.bind(ProcessorLabel.OtherWorldsActionProcessor, OtherWorldsActionProcessor);
container.bind(ProcessorLabel.OtherWorldsDeltaProcessor, OtherWorldsDeltaProcessor);
// 'boost.worlds'
container.bind(ProcessorLabel.BoostWorldsActionProcessor, BoostWorldsActionProcessor);
container.bind(ProcessorLabel.BoostWorldsDeltaProcessor, BoostWorldsDeltaProcessor);
// 'ptpxy.worlds'
container.bind(ProcessorLabel.PtpxyWorldsActionProcessor, PtpxyWorldsActionProcessor);
container.bind(ProcessorLabel.PtpxyWorldsDeltaProcessor, PtpxyWorldsDeltaProcessor);
// 'nftmt.worlds'
container.bind(ProcessorLabel.NftmtWorldsActionProcessor, NftmtWorldsActionProcessor);
container.bind(ProcessorLabel.NftmtWorldsDeltaProcessor, NftmtWorldsDeltaProcessor);
// 'notify.world'
container.bind(ProcessorLabel.NotifyWorldActionProcessor, NotifyWorldActionProcessor);
container.bind(ProcessorLabel.NotifyWorldDeltaProcessor, NotifyWorldDeltaProcessor);
// 'awlndratings'
container.bind(ProcessorLabel.AwlndratingsActionProcessor, AwlndratingsActionProcessor);
container.bind(ProcessorLabel.AwlndratingsDeltaProcessor, AwlndratingsDeltaProcessor);

export default container;
