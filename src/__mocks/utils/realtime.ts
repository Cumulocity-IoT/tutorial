import { RealtimeAction, RealtimeMessage } from '@c8y/ngx-components';
import { Channels, IAnyData } from '../mock.model';
import { getFakeAlarm } from './generators/alarms';
import { getFakeEvent } from './generators/events';
import { generateRealtimeDeviceMO } from './generators/managedObjects';
import { getFakeMeasurement } from './generators/measurement';
import { getFakeOperation, getFakeOperationBulk } from './generators/operations';

/**
 * Map of generators for various channels. Each generator function generates a mock data of specific type.
 */
const generators: Record<string, (id?: string) => IAnyData> = {
  [Channels.ManagedObjects]: generateRealtimeDeviceMO,
  [Channels.Operations]: getFakeOperation,
  [Channels.BulkOperations]: getFakeOperationBulk,
  [Channels.Measurements]: getFakeMeasurement,
  [Channels.Alarms]: getFakeAlarm,
  [Channels.Events]: getFakeEvent,
};

/**
 * Function to generate fake data for a given channel.
 *
 * @param  channel - The channel for which the fake data is to be generated.
 * @returns - The generated fake data wrapped in a RealtimeMessage object.
 * @throws - Throws an error if there's no generator available for the given channel.
 */
export function getFakeData<T>(channel: string): RealtimeMessage<T> {
  const { generator, subscribedId } = resolveGenerator(channel);
  if (!generator) {
    throw new Error(
      `No fake data generator for channel ${channel}, either stay with the supported mocked channels (${Object.keys(
        generators,
      )}), provide a generator for your channel or remove the "noLogin" query parameter and login.`,
    );
  }
  const data: IAnyData = generator(subscribedId);
  if (subscribedId) {
    // A channel of a single entity only delivers data of that entity.
    data.id = subscribedId;
  }
  const message: RealtimeMessage<T> = {
    id: (data?.id).toString(),
    channel: data?.id ? channel.replace('*', (data?.id).toString()) : channel,
    realtimeAction: getRandomRealtimeAction(),
    data: data as unknown as T,
  };
  return message;
}

/**
 * Resolves the generator of a channel. A channel of a single entity, for example
 * `/managedobjects/1`, is served by the generator of its wildcard channel, `/managedobjects/*`.
 *
 * @param channel - The channel to resolve the generator for.
 * @returns The generator and, for a channel of a single entity, the id of that entity.
 */
function resolveGenerator(channel: string): {
  generator?: (id?: string) => IAnyData;
  subscribedId?: string;
} {
  if (generators[channel]) {
    return { generator: generators[channel] };
  }

  const [, wildcardChannel, subscribedId] = /^(.*\/)([^/*]+)$/.exec(channel) ?? [];

  return { generator: generators[`${wildcardChannel}*`], subscribedId };
}

/**
 * Function to generate a random RealtimeAction.
 * It returns 'UPDATE' in 80% of the cases, otherwise, it returns either 'CREATE' or 'DELETE' randomly.
 *
 * @returns The randomly generated RealtimeAction.
 */
function getRandomRealtimeAction(): RealtimeAction {
  if (Math.random() <= 0.8) {
    return 'UPDATE';
  }
  return Math.random() < 0.5 ? 'CREATE' : 'DELETE';
}
