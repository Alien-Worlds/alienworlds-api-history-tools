export type Environment = {
  MONGO_HOSTS?: string;
  MONGO_PORTS?: string;
  MONGO_USER?: string;
  MONGO_PASSWORD?: string;
  MONGO_SRV?: number;
  MONGO_SSL?: number;
  MONGO_REPLICA_SET?: string;
  MONGO_AUTH_MECHANISM?: string;
  MONGO_AUTH_SOURCE?: string;
  MONGO_DB_NAME?: string;
  BROADCAST_URL?: string;
  BROADCAST_PORT?: string;
  BROADCAST_HOST?: string;
  BROADCAST_DRIVER?: string;
  BLOCKCHAIN_ENDPOINT?: string;
  BLOCKCHAIN_CHAIN_ID?: string;
  SCANNER_NODES_MAX_CHUNK_SIZE?: string;
  SCANNER_SCAN_KEY?: string;
  BLOCK_READER_ENDPOINTS?: string;
  BLOCK_READER_FETCH_DELTAS?: string;
  BLOCK_READER_FETCH_TRACES?: string;
  START_BLOCK?: string;
  END_BLOCK?: string;
  MODE?: string;
  HYPERION_URL?: string;
  ABIS_SERVICE_LIMIT?: string;
  ABIS_SERVICE_FILTER?: string;
  BLOCK_RANGE_MAX_THREADS?: string;
  BLOCK_RANGE_INVIOLABLE_THREADS_COUNT?: string;
  PROCESSOR_MAX_THREADS?: string;
  PROCESSOR_INVIOLABLE_THREADS_COUNT?: string;
  PROCESSOR_BINDINGS_PATH?: string;
  PROCESSOR_QUEUE_WRITE_CONCERN?: string;
  PROCESSOR_QUEUE_READ_PREFERENCE?: string;
  PROCESSOR_QUEUE_READ_CONCERN?: string;
  PROCESSOR_USE_SESSION?: number;
};