import {
  Container,
  EosJsRpcSource,
  MongoSource,
} from '@alien-worlds/api-core';
import { HistoryToolsConfig } from '@alien-worlds/api-history-tools';

export const ioc = new Container();

export const setupDependencies = async (config: HistoryToolsConfig) => {
  const { blockchain, mongo } = config;
  /**
   *  MongoDB
   */
  const mongoSource = new MongoSource.create(mongo);
  /**
   *  JsonRpc
   */
  const eosRpc = new EosJsRpcSource(blockchain.endpoint);
};
