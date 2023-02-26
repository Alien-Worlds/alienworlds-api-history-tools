import { MongoConfig, parseToBigInt } from '@alien-worlds/api-core';
import { HistoryToolsConfig } from '@alien-worlds/api-history-tools';
import { FeaturedConfig } from '@alien-worlds/api-history-tools/build/common/featured';
import featuredConfig from '../featured';
import { readEnvFile } from './config.utils';
import { Environment } from './config.types';

export const buildConfig = (): HistoryToolsConfig => {
  const environment: Environment = { ...process.env } as Environment;
  const dotEnv = readEnvFile();

  const mongo: MongoConfig = {
    hosts: (environment.MONGO_HOSTS || dotEnv.MONGO_HOSTS).split(/,\s*/),
    ports: (environment.MONGO_PORTS || dotEnv.MONGO_PORTS).split(/,\s*/),
    database: environment.MONGO_DB_NAME || dotEnv.MONGO_DB_NAME,
    user: environment.MONGO_USER || dotEnv.MONGO_USER,
    password: environment.MONGO_PASSWORD || dotEnv.MONGO_PASSWORD,
    srv: Boolean(Number(environment.MONGO_SRV || dotEnv.MONGO_SRV)),
    ssl: Boolean(Number(environment.MONGO_SSL || dotEnv.MONGO_SSL)),
    replicaSet: environment.MONGO_REPLICA_SET || dotEnv.MONGO_REPLICA_SET,
    authMechanism: environment.MONGO_AUTH_MECHANISM || dotEnv.MONGO_AUTH_MECHANISM,
    authSource: environment.MONGO_AUTH_SOURCE || dotEnv.MONGO_AUTH_SOURCE,
  };

  return {
    broadcast: {
      url: environment.BROADCAST_URL || dotEnv.BROADCAST_URL,
      port: Number(environment.BROADCAST_PORT || dotEnv.BROADCAST_PORT),
      host: environment.BROADCAST_HOST || dotEnv.BROADCAST_HOST,
      driver: environment.BROADCAST_DRIVER || dotEnv.BROADCAST_DRIVER,
    },
    blockchain: {
      endpoint: environment.BLOCKCHAIN_ENDPOINT || dotEnv.BLOCKCHAIN_ENDPOINT,
      chainId: environment.BLOCKCHAIN_CHAIN_ID || dotEnv.BLOCKCHAIN_CHAIN_ID,
    },
    scanner: {
      maxChunkSize: Number(
        environment.SCANNER_NODES_MAX_CHUNK_SIZE || dotEnv.SCANNER_NODES_MAX_CHUNK_SIZE
      ),
      scanKey: environment.SCANNER_SCAN_KEY || dotEnv.SCANNER_SCAN_KEY,
    },
    blockReader: {
      endpoints: (
        environment.BLOCK_READER_ENDPOINTS || dotEnv.BLOCK_READER_ENDPOINTS
      ).split(','),
      shouldFetchDeltas: Boolean(
        Number(environment.BLOCK_READER_FETCH_DELTAS || dotEnv.BLOCK_READER_FETCH_DELTAS)
      ),
      shouldFetchTraces: Boolean(
        Number(environment.BLOCK_READER_FETCH_TRACES || dotEnv.BLOCK_READER_FETCH_TRACES)
      ),
    },
    contractReader: {
      url: environment.HYPERION_URL || dotEnv.HYPERION_URL,
    },
    mongo,
    startBlock:
      environment.START_BLOCK || dotEnv.START_BLOCK
        ? parseToBigInt(environment.START_BLOCK || dotEnv.START_BLOCK)
        : null,
    endBlock:
      environment.END_BLOCK || dotEnv.END_BLOCK
        ? parseToBigInt(environment.END_BLOCK || dotEnv.END_BLOCK)
        : null,
    mode: environment.MODE || dotEnv.MODE,
    featured,
    abis: {
      service: {
        url: environment.HYPERION_URL || dotEnv.HYPERION_URL,
        limit: Number(environment.ABIS_SERVICE_LIMIT || dotEnv.ABIS_SERVICE_LIMIT),
        filter: environment.ABIS_SERVICE_FILTER || dotEnv.ABIS_SERVICE_FILTER,
      },
      mongo,
      featured,
    },
    blockRange: {
      workers: {
        threadsCount: Number(
          environment.BLOCK_RANGE_MAX_THREADS || dotEnv.BLOCK_RANGE_MAX_THREADS
        ),
        inviolableThreadsCount: Number(
          environment.BLOCK_RANGE_INVIOLABLE_THREADS_COUNT ||
            dotEnv.BLOCK_RANGE_INVIOLABLE_THREADS_COUNT
        ),
        sharedData: {
          config: {
            mongo,
          },
        },
      },
    },
    processor: {
      workers: {
        threadsCount: Number(
          environment.PROCESSOR_MAX_THREADS || dotEnv.PROCESSOR_MAX_THREADS
        ),
        inviolableThreadsCount: Number(
          environment.PROCESSOR_INVIOLABLE_THREADS_COUNT ||
            dotEnv.PROCESSOR_INVIOLABLE_THREADS_COUNT
        ),
        containerPath: `${__dirname}/../${
          environment.PROCESSOR_BINDINGS_PATH || dotEnv.PROCESSOR_BINDINGS_PATH
        }`,
        sharedData: {
          config: {
            mongo,
          },
        },
      },
      taskQueue: {
        interval: 5000,
      },
    },
    api: {
      port: 5000,
    },
  };
};

const featured = featuredConfig as FeaturedConfig;
