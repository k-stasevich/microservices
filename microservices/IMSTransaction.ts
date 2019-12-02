import { IEvent } from './events';

export interface IMSTransaction<T extends IEvent> {
  commit(): Promise<any>;
  rollback(): T;
}
