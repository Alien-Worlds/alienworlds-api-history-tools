import { buildLeaderboardApiUrl } from '@alien-worlds/alienworlds-api-common';
import { MongoSource } from '@alien-worlds/api-core';
import cron from 'cron';
import { buildConfig } from '../config/config';
import { updateLeaderboard } from './update-leaderboard';

export const start = async () => {
  const config = buildConfig();
  const {
    cron: { leaderboardUpdateTime },
  } = config;
  //
  if (leaderboardUpdateTime) {
    const mongoSource = await MongoSource.create(config.mongo);
    const url = buildLeaderboardApiUrl(config.leaderboard.api);
    const leaderboardCronJob = new cron.CronJob(leaderboardUpdateTime, () =>
      updateLeaderboard(url, mongoSource)
    );

    leaderboardCronJob.start();
  }
};

start();
