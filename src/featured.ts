import { ProcessorLabel } from './processor/processor.labels';

export default {
  traces: [
    {
      shipTraceMessageName: ['transaction_trace_v0'],
      shipActionTraceMessageName: ['action_trace_v0', 'action_trace_v1'],
      contract: ['alien.worlds'],
      action: ['*'],
      processor: ProcessorLabel.AlienWorldsActionProcessor,
    },
    {
      shipTraceMessageName: ['transaction_trace_v0'],
      shipActionTraceMessageName: ['action_trace_v0', 'action_trace_v1'],
      contract: ['m.federation'],
      action: ['*'],
      processor: ProcessorLabel.MFederationActionProcessor,
    },
    {
      shipTraceMessageName: ['transaction_trace_v0'],
      shipActionTraceMessageName: ['action_trace_v0', 'action_trace_v1'],
      contract: ['federation'],
      action: ['*'],
      processor: ProcessorLabel.FederationActionProcessor,
    },
    {
      shipTraceMessageName: ['transaction_trace_v0'],
      shipActionTraceMessageName: ['action_trace_v0', 'action_trace_v1'],
      contract: ['uspts.worlds'],
      action: ['*'],
      processor: ProcessorLabel.UsptsWorldsActionProcessor,
    },
  ],
  deltas: [
    {
      shipDeltaMessageName: ['table_delta_v0'],
      name: ['contract_row'],
      code: ['alien.worlds'],
      scope: ['*'],
      table: ['*'],
      processor: ProcessorLabel.AlienWorldsDeltaProcessor,
    },
    {
      shipDeltaMessageName: ['table_delta_v0'],
      name: ['contract_row'],
      code: ['federation'],
      scope: ['*'],
      table: ['*'],
      processor: ProcessorLabel.FederationDeltaProcessor,
    },
    {
      shipDeltaMessageName: ['table_delta_v0'],
      name: ['contract_row'],
      code: ['m.federation'],
      scope: ['*'],
      table: ['*'],
      processor: ProcessorLabel.MFederationDeltaProcessor,
    },
    {
      shipDeltaMessageName: ['table_delta_v0'],
      name: ['contract_row'],
      code: ['uspts.worlds'],
      scope: ['*'],
      table: ['*'],
      processor: ProcessorLabel.UsptsWorldsDeltaProcessor,
    },
  ],
};
