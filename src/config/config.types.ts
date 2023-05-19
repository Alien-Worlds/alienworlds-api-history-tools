import { AtomicAssetsConfig } from '@alien-worlds/alienworlds-api-common';
import { HistoryToolsConfig } from '@alien-worlds/api-history-tools';

export type AlienworldsHistoryToolsConfig = HistoryToolsConfig & {
  atomicassets: AtomicAssetsConfig;
};
