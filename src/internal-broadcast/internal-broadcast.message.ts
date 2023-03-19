import { BroadcastTcpMessageType } from '@alien-worlds/api-core';
import { InternalBroadcastChannel } from '@alien-worlds/api-history-tools';
import { AlienWorldsBroadcastMessageName } from './internal-broadcast.enums';

export class LeaderboardUpdateBroadcastMessage<DataType = unknown> {
  public static create<DataType = unknown>(data: DataType) {
    console.log('SEND>', data);
    return {
      channel: InternalBroadcastChannel.ExternalBroadcast,
      name: AlienWorldsBroadcastMessageName.LeaderboardUpdate,
      type: BroadcastTcpMessageType.Data,
      data,
    };
  }
}
