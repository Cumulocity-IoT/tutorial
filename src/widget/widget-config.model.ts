import { IIdentified, IManagedObject } from '@c8y/client';

export interface WidgetConfig {
  text?: string;
  device?: IIdentified & Partial<IManagedObject>;
}
