import { Expense } from '../types';

interface Props {
  people: string[];
  expenses: Expense[];
}

interface Debt {
  from: string;
  to: string;
  amount: number;
}

function BalanceView({ people, expenses }: Props) {
  const balances: Record<string, number> = {};

  people.forEach(p => (balances[p] = 0));

  // Calculate balances
  expenses.forEach(exp => {
    // ✅ Handle Custom Split
    if (exp.splitType === 'custom' && exp.customAmounts) {
      Object.entries(exp.customAmounts).forEach(([person, amt]) => {
        balances[person] -= amt;
      });

      balances[exp.paidBy] += exp.amount;
      return;
    }

    // ✅ Equal Split (Existing Logic)
    const share = exp.amount / exp.splitBetween.length;

    exp.splitBetween.forEach(p => {
      balances[p] -= share;
    });

    balances[exp.paidBy] += exp.amount;
  });

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  // ---- Debt Simplification ----
  const creditors: { name: string; amt: number }[] = [];
  const debtors: { name: string; amt: number }[] = [];

  Object.entries(balances).forEach(([name, amt]) => {
    if (amt > 0.01) creditors.push({ name, amt });
    if (amt < -0.01) debtors.push({ name, amt: -amt });
  });

  const settlements: Debt[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: pay,
    });

    debtors[i].amt -= pay;
    creditors[j].amt -= pay;

    if (debtors[i].amt < 0.01) i++;
    if (creditors[j].amt < 0.01) j++;
  }

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
      <h2 className="text-gray-800 mb-5 text-2xl font-semibold border-b border-gray-200 pb-3">
        💰 Balances
      </h2>

      {/* Total */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl mb-6">
        <span>Total Group Spending:</span>
        <strong className="text-2xl">${total.toFixed(2)}</strong>
      </div>

      {/* Individual balances */}
      <h3 className="text-gray-600 mb-3 text-lg font-medium">
        Individual Balances
      </h3>

      {people.map(person => {
        const val = balances[person];

        const isOwed = val > 0.01;
        const owes = val < -0.01;

        return (
          <div
            key={person}
            className={`flex justify-between items-center px-4 py-3 mb-2 rounded-lg border text-sm ${
              isOwed
                ? 'bg-green-100 border-green-300'
                : owes
                ? 'bg-red-100 border-red-300'
                : 'bg-white border-gray-200'
            }`}
          >
            <span className="font-medium">{person}</span>

            {isOwed && (
              <span className="text-green-700">
                is owed <strong>+${val.toFixed(2)}</strong>
              </span>
            )}

            {owes && (
              <span className="text-red-700">
                owes <strong>-${Math.abs(val).toFixed(2)}</strong>
              </span>
            )}

            {!isOwed && !owes && (
              <span className="text-gray-600">settled up</span>
            )}
          </div>
        );
      })}

      {/* Suggested settlements */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-5">
        <h3 className="text-gray-800 mb-1 text-lg font-semibold flex items-center gap-2">
          💸 Suggested Settlements
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Minimum transactions to settle all debts:
        </p>

        {settlements.length === 0 && (
          <div className="text-center py-4 bg-green-100 rounded-lg text-green-800">
            ✅ All balances are settled!
          </div>
        )}

        <div className="space-y-3">
          {settlements.map((s, idx) => (
            <div
              key={idx}
              className="flex justify-between px-4 py-3 mb-2 rounded-lg bg-gray-50 border text-sm"
            >
              <span className="text-sm">
                <strong className="text-red-600 bg-white px-1 rounded">
                  {s.from}
                </strong>{' '}
                <span className="mx-1 text-gray-400">→</span>
                <strong className="text-green-600 bg-white px-1 rounded">
                  {s.to}
                </strong>
              </span>

              <strong>${s.amount.toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BalanceView;
