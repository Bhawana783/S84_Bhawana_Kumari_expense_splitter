import { useState } from 'react';
import { Expense } from '../types';

interface Props {
  people: string[];
  onAddExpense: (expense: Expense) => void;
}

function ExpenseForm({ people, onAddExpense }: Props) {
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !paidBy || selected.length === 0) return;

    if (splitType === 'custom') {
      const totalCustom = Object.values(customAmounts).reduce(
        (s, v) => s + v,
        0
      );

      if (Math.abs(totalCustom - amount) > 0.01) {
        alert('Custom amounts must equal total amount');
        return;
      }
    }

    onAddExpense({
      id: Date.now(),
      description: desc,
      amount,
      paidBy,
      splitBetween: selected,
      date: date || new Date().toISOString(),
      splitType,
      customAmounts: splitType === 'custom' ? customAmounts : undefined,
    });

    setDesc('');
    setAmount(0);
    setPaidBy('');
    setSelected([]);
    setDate('');
    setSplitType('equal');
    setCustomAmounts({});
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg transition-all hover:-translate-y-px">
      {/* Title */}
      <h2 className="text-gray-800 mb-5 text-2xl font-semibold border-b border-gray-200 pb-3 flex items-center gap-2">
        💸 Add Expense
      </h2>

      <form onSubmit={submit}>
        {/* Description */}
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-gray-700 font-medium text-sm">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="What was the expense for?"
            className="w-full h-10 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        {/* Amount + Date */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <label htmlFor="amount" className="block mb-2 text-gray-700 font-medium text-sm">
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full h-10 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={e => setAmount(+e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label htmlFor="date" className="block mb-2 text-gray-700 font-medium text-sm">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full h-10 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Paid By */}
        <div className="mb-5">
          <label htmlFor="paidBy" className="block mb-2 text-gray-700 font-medium text-sm">
            Paid By
          </label>
          <select
            id="paidBy"
            value={paidBy}
            onChange={e => setPaidBy(e.target.value)}
            className="w-full h-10 px-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="">Select person...</option>
            {people.map(person => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>

        {/* Split Type */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-medium text-sm">Split Type</label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
              <input
                type="radio"
                value="equal"
                name="splitType"
                checked={splitType === 'equal'}
                onChange={() => {
                  setSplitType('equal');
                  setCustomAmounts({});
                }}
              />
              Equal Split
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
              <input
                type="radio"
                value="custom"
                name="splitType"
                checked={splitType === 'custom'}
                onChange={() => {
                  setSplitType('custom');
                  setCustomAmounts({});
                }}
              />
              Custom Amounts
            </label>
          </div>
        </div>

        {/* Split Between */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium text-sm">Split Between</label>
          <div className="flex flex-col gap-3">
            {people.map(person => (
              <div
                key={person}
                className="flex items-center px-4 py-3 bg-gray-50 rounded-xl"
              >
                <label className="flex items-center gap-2 cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={selected.includes(person)}
                    onChange={e =>
                      setSelected(
                        e.target.checked
                          ? [...selected, person]
                          : selected.filter(p => p !== person)
                      )
                    }
                  />
                  {person}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Split Inputs */}
        {splitType === 'custom' && (
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium text-sm">
              Custom Amounts
            </label>

            <div className="space-y-2">
              {selected.map(person => (
                <div
                  key={person}
                  className="flex justify-between items-center px-3 py-2 bg-gray-100 rounded-lg"
                >
                  <span>{person}</span>

                  <input
                    type="number"
                    step="0.01"
                    className="w-24 px-2 py-1 border rounded text-sm"
                    value={customAmounts[person] || ''}
                    onChange={e =>
                      setCustomAmounts({
                        ...customAmounts,
                        [person]: +e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-11 bg-indigo-600 text-white rounded-xl text-base font-medium transition hover:bg-indigo-700 active:scale-[0.99]"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
