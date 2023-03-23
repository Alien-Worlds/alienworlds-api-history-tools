import { LeaderboardUpdateStruct } from '@alien-worlds/alienworlds-api-common';
import { Result, MongoSource, MongoDB } from '@alien-worlds/api-core';

export class LeaderboardUpdateBackupRepository {
  private collection: MongoDB.Collection;
  constructor(mongoSource: MongoSource) {
    this.collection = mongoSource.database.collection('leaderboard_update_backup');
  }

  public async addMany(items: LeaderboardUpdateStruct[]): Promise<Result<void, Error>> {
    this.collection.insertMany(items);
    return Result.withoutContent();
  }

  public async extractAll(): Promise<Result<LeaderboardUpdateStruct[], Error>> {
    const list = await this.collection.find();
    const all = await list.toArray();

    await this.collection.deleteMany({});
    return Result.withContent(all as unknown as LeaderboardUpdateStruct[]);
  }
}
