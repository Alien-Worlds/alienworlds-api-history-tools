import { log } from '@alien-worlds/api-core';
import { startProcessor } from '@alien-worlds/api-history-tools';
import { Command } from 'commander';
import { ProcessorOptions } from './processor.types';
import { buildAlienWorldsProcessorConfig } from './processor.config';

const program = new Command();

const start = async (options: ProcessorOptions) => {
  // setup process config
  const config = buildAlienWorldsProcessorConfig(options);
  startProcessor(config).catch(log);
};

program
  .version('1.0', '-v, --version')
  .option('-t, --threads <threads>', 'Number of threads')
  .parse(process.argv);

start(program.opts<ProcessorOptions>()).catch(log);
