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

export default container;
