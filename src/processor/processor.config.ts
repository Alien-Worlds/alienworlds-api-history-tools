import { HistoryToolsConfig, ProcessorConfig } from '@alien-worlds/api-history-tools';
import { ProcessorOptions } from './processor.types';

export const buildProcessorConfig = (
  options: ProcessorOptions,
  config: HistoryToolsConfig,
  sharedData?: unknown
): ProcessorConfig => {
  const {
    broadcast,
    processor: { workers, taskQueue },
    featured,
    mongo,
  } = config;

  if (options.threads) {
    workers.threadsCount = options.threads;
  }

  if (sharedData) {
    workers.sharedData = sharedData;
  }

  return {
    broadcast,
    featured,
    mongo,
    workers,
    queue: taskQueue,
  };
};
