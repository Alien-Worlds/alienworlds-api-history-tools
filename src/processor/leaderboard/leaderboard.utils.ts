import fetch from 'node-fetch';
import {
  buildLeaderboardApiUrl,
  FederationContract,
  NotifyWorldContract,
  UsptsWorldsContract,
} from '@alien-worlds/alienworlds-api-common';
import { log } from '@alien-worlds/api-core';
import { ProcessorSharedData } from '../processor.types';

type LeaderboardUpdateStruct = {
  wallet_id: string;
  username?: string;
  bounty?: string | number;
  block_number?: string;
  block_timestamp?: string;
  points?: number | string;
  land_id?: string;
  planet_name?: string;
  bag_items?: string[];
  [key: string]: unknown;
};

type PostFailureCallback = (structs: LeaderboardUpdateStruct[]) => void;

export const postLeaderboard = async (
  url: string,
  body: LeaderboardUpdateStruct[],
  onFailure: PostFailureCallback
): Promise<boolean> => {
  try {
    log(`Leaderboard Service: Sending ${body.length} structs...`);
    const response = await fetch(new URL('/v1/leaderboard', url), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      log(`Leaderboard Service: Sent.`);
      return true;
    }
  } catch (error) {
    log(error);
    if (onFailure) {
      onFailure(body);
    }
    return false;
  }
};

export const updateLeaderboards = async (
  blockNumber: bigint,
  blockTimestamp: Date,
  sharedData: ProcessorSharedData,
  onFailure: PostFailureCallback
) => {
  const {
    leaderboard,
    config: {
      leaderboard: { api },
    },
  } = sharedData;
  const structs: (
    | NotifyWorldContract.Actions.Types.LogmineStruct
    | UsptsWorldsContract.Actions.Types.AddpointsStruct
    | FederationContract.Actions.Types.SettagStruct
  )[] = leaderboard.splice(0);

  const body: LeaderboardUpdateStruct[] = structs.map(struct => {
    //
    if (struct.account && struct.tag) {
      const data = <FederationContract.Actions.Types.SettagStruct>struct;
      return {
        wallet_id: data.account,
        username: data.tag,
        block_number: blockNumber.toString(),
        block_timestamp: blockTimestamp.toISOString(),
      };
    }

    if (struct.user && struct.points) {
      const data = <UsptsWorldsContract.Actions.Types.AddpointsStruct>struct;
      return {
        wallet_id: data.user,
        points: data.points,
        block_number: blockNumber.toString(),
        block_timestamp: blockTimestamp.toISOString(),
      };
    }

    const data = <NotifyWorldContract.Actions.Types.LogmineStruct>struct;
    return {
      wallet_id: data.miner,
      bounty: data.bounty,
      land_id: data.land_id,
      planet_name: data.planet_name,
      bag_items: data.bag_items,
      block_number: blockNumber.toString(),
      block_timestamp: blockTimestamp.toISOString(),
    };
  });

  return postLeaderboard(buildLeaderboardApiUrl(api), body, onFailure);
};
