import {
  IOperation,
  IOperationBulk,
  IOperationBulkProgress,
  OperationBulkGeneralStatus,
  OperationBulkStatus,
  OperationStatus
} from '@c8y/client';
import { generateId } from '../common';

// Operation
export function getFakeOperation(): IOperation {
  return {
    id: generateId(),
    deviceId: generateId(),
    status: getRandomOperationStatus(),
    customFragment: 'customData'
  };
}

function getRandomOperationStatus(): OperationStatus {
  const statuses = Object.values(OperationStatus) as OperationStatus[];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// OperationBulk
export function getFakeOperationBulk(): IOperationBulk {
  return {
    id: generateId(),
    groupId: generateId(),
    startDate: new Date().toISOString(),
    creationRamp: Math.floor(Math.random() * 10),
    operationPrototype: getFakeOperation(),
    status: getRandomOperationBulkStatus(),
    generalStatus: getRandomOperationBulkGeneralStatus(),
    progress: getFakeOperationBulkProgress(),
    failedParentId: generateId(),
    note: `This is a note ${Math.floor(Math.random() * 1000000000).toString()}`,
    self: 'http://example.com/self/...'
  };
}

function getRandomOperationBulkStatus(): OperationBulkStatus {
  const statuses = Object.values(OperationBulkStatus) as OperationBulkStatus[];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomOperationBulkGeneralStatus(): OperationBulkGeneralStatus {
  const statuses = Object.values(OperationBulkGeneralStatus) as OperationBulkGeneralStatus[];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getFakeOperationBulkProgress(): IOperationBulkProgress {
  const all = Math.floor(Math.random() * 100);
  const successful = Math.floor(Math.random() * all);
  const failed = Math.floor(Math.random() * (all - successful));
  const executing = Math.floor(Math.random() * (all - successful - failed));
  const pending = all - successful - failed - executing;

  return {
    all,
    successful,
    failed,
    executing,
    pending
  };
}
