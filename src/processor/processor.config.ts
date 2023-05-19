import {
  ConfigVars,
  buildBroadcastConfig,
  buildMongoConfig,
} from '@alien-worlds/api-core';
import {
  ProcessorCommandOptions,
  ProcessorConfig,
  buildProcessorConfig,
} from '@alien-worlds/api-history-tools';
import featured from '../featured';

export const buildLeaderboardProcessorConfig = (
  options: ProcessorCommandOptions
): ProcessorConfig => {
  const vars = new ConfigVars();
  const mongo = buildMongoConfig(vars);
  const processorConfig = buildProcessorConfig(vars, featured, options);
  const broadcast = buildBroadcastConfig(vars);

  processorConfig.workers.sharedData = {
    config: {
      mongo,
      broadcast,
    },
  };

  processorConfig.processorLoaderPath = `${__dirname}/processor.worker-loader`;

  return processorConfig;
};
