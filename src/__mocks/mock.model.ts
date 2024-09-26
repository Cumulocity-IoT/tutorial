import { InjectionToken } from '@angular/core';
import {
  IAlarm,
  IEvent,
  IManagedObject,
  IMeasurement,
  IOperation,
  IOperationBulk
} from '@c8y/client';
import { HttpInterceptor } from '@c8y/ngx-components/api';

/**
 * A string literal type that represents the HTTP methods that can be used for making requests.
 */
export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH';
/**
 * A type that extends the built-in Response object to include a json method, which returns a Promise of a generic type T.
 */
export type ResponseWithType<T = unknown> = Response & {
  json: () => T;
};
/**
 * A union type representing any of the possible data types.
 */
export type IAnyData =
  | IAlarm
  | IEvent
  | IManagedObject
  | IMeasurement
  | IOperation
  | IOperationBulk;

/**
 * Enumeration of the possible channel paths.
 */
export enum Channels {
  ManagedObjects = '/managedobjects/*',
  Operations = '/operations/*',
  BulkOperations = '/bulkOperations/*',
  Measurements = '/measurements/*',
  Alarms = '/alarms/*',
  Events = '/events/*',
  MangedObjectsMap = '/managedobjects/1'
}
/**
 * path and mockService
 */
export const API_MOCK_CONFIG = new InjectionToken<ApiMockConfig>('ApiMockConfig');
/**
 * Interface for configuring API mocking.
 */
export interface ApiMockConfig {
  /**
   * Route path under which all interceptors are registered.
   * By default all routes are affected.
   */
  path?: string;
  /**
   * Mock service that should implement the HttpInterceptor interface.
   * This service will be used to intercept http requests and return mock responses.
   */
  mockService: new (...args: unknown[]) => HttpInterceptor;
  /**
   * Unique identifier for the interceptor.
   */
  id: string;
  debug?: boolean;
}
/**
 * An object representing default values for pagination statistics.
 */
export const DEFAULT_STATISTICS = {
  totalPages: 1,
  pageSize: 2000,
  currentPage: 1
};
