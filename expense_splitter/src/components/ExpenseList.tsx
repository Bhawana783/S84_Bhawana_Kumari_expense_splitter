import { useState } from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

function ExpenseList({ expenses, onDelete }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toggle = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // ✅ SORT expenses by date (latest first)
  const sortedExpenses = [...expenses].sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-xl p-6 mb-6 shadow-xl">
      <h2 className="text-gray-700 mb-4 text-2xl border-b border-gray-200 pb-2">
        📝 Expense History
      </h2>

      {sortedExpenses.length === 0 ? (
        <p className="text-center text-gray-400 py-8 italic">
          No expenses added yet.
        </p>
      ) : (
        sortedExpenses.map(expense => {
          const isOpen = expandedId === expense.id;

          return (
            <div
              key={expense.id}
              className="bg-gray-50 rounded-lg mb-5 border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div
                onClick={() => toggle(expense.id)}
                className="px-5 py-4 flex justify-between items-center cursor-pointer hover:bg-gray-100"
              >
                <div>
                  <h4 className="text-gray-800 text-lg">
                    {expense.description}
                  </h4>

                  <div className="text-sm text-gray-500 mt-1 flex gap-3">
                    <span>{formatDate(expense.date)}</span>
                    <span>Paid by {expense.paidBy}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <strong className="font-semibold">
                    ${expense.amount.toFixed(2)}
                  </strong>

                  <span className="text-xl text-black font-bold">
                    {isOpen ? '▾' : '▸'}
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {isOpen && (
                <div className="px-5 pb-5 pt-3 bg-white border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-3">
                    Split Details ({expense.splitType})
                  </p>

                  {expense.splitType === 'custom' &&
                  expense.customAmounts ? (
                    Object.entries(expense.customAmounts).map(
                      ([person, amt]) => (
                        <div
                          key={person}
                          className="flex justify-between py-2 px-3 mb-1 text-sm bg-gray-100 rounded-md"
                        >
                          <span>{person}</span>

                          <span className="text-red-600">
                            owes ${amt.toFixed(2)}
                          </span>
                        </div>
                      )
                    )
                  ) : (
                    expense.splitBetween.map(p => (
                      <div
                        key={p}
                        className="flex justify-between py-2 px-3 mb-1 text-sm bg-gray-100 rounded-md"
                      >
                        <span>{p}</span>

                        <span className="text-red-600">
                          owes $
                          {(
                            expense.amount /
                            expense.splitBetween.length
                          ).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-red-600"
                    >
                      🗑 Delete Expense
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      <div className="text-center p-3 bg-gray-50 rounded-lg text-gray-700 mt-4">
        Total Expenses: <strong>{expenses.length}</strong>
      </div>
    </div>
  );
}

export default ExpenseList;
