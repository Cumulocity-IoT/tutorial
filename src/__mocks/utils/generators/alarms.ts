import { IAlarm, SeverityType } from '@c8y/client';
import { generateId, getFakeSource } from '../common';
import { AlarmStatusType } from '@c8y/client';

export function getFakeAlarm(): IAlarm {
  const severities: SeverityType[] = ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'];
  const statuses: AlarmStatusType[] = ['ACKNOWLEDGED', 'CLEARED', 'ACTIVE'];

  return {
    severity: severities[Math.floor(Math.random() * severities.length)],
    source: getFakeSource(),
    type: `Type_${Math.floor(Math.random() * 1000)}`,
    time: new Date().toISOString(),
    text: `Text_${Math.floor(Math.random() * 1000)}`,
    id: generateId(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    count: Math.floor(Math.random() * 100),
    name: `Name_${Math.floor(Math.random() * 1000)}`,
    self: 'https://example.com/self/...}',
    creationTime: new Date().toISOString()
  };
}
