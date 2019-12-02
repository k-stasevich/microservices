import { IMSTransaction } from './IMSTransaction';
import { IEvent } from './events';

export const executeTransactions = async <T extends IEvent>(
  transactions: IMSTransaction<T>[],
) => {
  const allResult = await Promise.all(
    transactions.map(t => {
      return t
        .commit()
        .then(result => {
          return { ms_transaction_success: true, result, t };
        })
        .catch(error => {
          return { ms_transaction_success: false, t };
        });
    }),
  );

  // have at least one error
  if (allResult.some(i => !i.ms_transaction_success)) {
    allResult
      .filter(i => i.ms_transaction_success)
      .forEach(i => {
        i.t.rollback();
      });
  } else {
    // no errors
  }

  return allResult;
};
