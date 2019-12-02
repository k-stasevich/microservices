import { executeTransactions } from './mstransaction.helper';
import { IEvent } from './events';
import { IMSTransaction } from './IMSTransaction';

interface IT1Event extends IEvent {
  id: number;
}
interface IT2Event extends IEvent {
  id: number;
}
interface IT3Event extends IEvent {
  id: number;
}
describe('mstransaction.helper', () => {
  describe('method executeTransaction', () => {
    test('Must return all commit results', async () => {
      // TRANSACTION 1 START
      const t1_rollback = jest.fn();
      const getT1Event = (id: number): IT1Event => ({
        event: 'T1_ROLLBACK',
        id,
      });
      class T1 implements IMSTransaction<IT1Event> {
        constructor(private id: number) {}
        commit() {
          return Promise.resolve({ source: 't1', id: this.id });
        }
        rollback() {
          t1_rollback();
          return getT1Event(this.id);
        }
      }
      // TRANSACTION 1 END

      // TRANSACTION 2 START
      const t2_rollback = jest.fn();
      const getT2Event = (id: number): IT2Event => ({
        event: 'T2_ROLLBACK',
        id,
      });
      class T2 implements IMSTransaction<IT2Event> {
        constructor(private id: number) {}
        commit() {
          return Promise.resolve({ source: 't2', id: this.id });
        }
        rollback() {
          t2_rollback();
          return getT2Event(this.id);
        }
      }
      // TRANSACTION 2 END

      const id = 1;
      const result = await executeTransactions([new T1(id), new T2(id)]);

      expect(t1_rollback).not.toHaveBeenCalled();
      expect(t2_rollback).not.toHaveBeenCalled();
      result.forEach(res => {
        expect(res.ms_transaction_success).toBe(true);
      });
    });
  });

  test('Must undo all success transactions if at there is at least one error', async () => {
    // TRANSACTION 1 START
    const t1_rollback = jest.fn();
    const getT1Event = (id: number): IT1Event => ({
      event: 'T1_ROLLBACK',
      id,
    });
    class T1 implements IMSTransaction<IT1Event> {
      constructor(private id: number) {}
      commit() {
        return Promise.reject({ error: true, source: 't1', id: this.id });
      }
      rollback() {
        t1_rollback();
        return getT1Event(this.id);
      }
    }
    // TRANSACTION 1 END

    // TRANSACTION 2 START
    const t2_rollback = jest.fn();
    const getT2Event = (id: number): IT2Event => ({
      event: 'T2_ROLLBACK',
      id,
    });
    class T2 implements IMSTransaction<IT2Event> {
      constructor(private id: number) {}
      commit() {
        return Promise.resolve({ source: 't2', id: this.id });
      }
      rollback() {
        t2_rollback();
        return getT2Event(this.id);
      }
    }
    // TRANSACTION 2 END
    // TRANSACTION 3 START
    const t3_rollback = jest.fn();
    const getT3Event = (id: number): IT3Event => ({
      event: 'T3_ROLLBACK',
      id,
    });
    class T3 implements IMSTransaction<IT3Event> {
      constructor(private id: number) {}
      commit() {
        return Promise.resolve({ source: 't3', id: this.id });
      }
      rollback() {
        t3_rollback();
        return getT3Event(this.id);
      }
    }
    // TRANSACTION 3 END

    const id = 1;
    const result = await executeTransactions([
      //
      new T1(id),
      new T2(id),
      new T3(id),
    ]);

    expect(t1_rollback).not.toHaveBeenCalled();
    expect(result[0].ms_transaction_success).toBe(false);

    expect(t2_rollback).toHaveBeenCalled();
    expect(result[1].ms_transaction_success).toBe(true);

    expect(t3_rollback).toHaveBeenCalled();
    expect(result[2].ms_transaction_success).toBe(true);
  });
});
