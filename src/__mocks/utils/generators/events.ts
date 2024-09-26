import { IEvent } from '@c8y/client';
import { generateId, getFakeSource } from '../common';

export function getFakeEvent(): IEvent {
  return {
    source: getFakeSource(),
    type: `Type_${Math.floor(Math.random() * 1000)}`,
    time: new Date().toISOString(),
    text: `Text_${Math.floor(Math.random() * 1000)}`,
    id: generateId(),
    self: 'https://example.com/self/...',
    creationTime: new Date().toISOString()
  };
}
