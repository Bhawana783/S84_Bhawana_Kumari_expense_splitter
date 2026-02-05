import { useState } from 'react';
import BalanceView from './components/BalanceView';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PeopleManager from './components/PeopleManager';
import { initialPeople, initialExpenses } from './initialData';
import { Expense } from './types';

function App() {
  const [people, setPeople] = useState<string[]>(initialPeople);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // Add person
  const addPerson = (name: string) => {
    if (!name || people.includes(name)) return;
    setPeople([...people, name]);
  };

  // Remove person
  const removePerson = (name: string) => {
    setPeople(people.filter(p => p !== name));
    setExpenses(expenses.filter(e => e.paidBy !== name));
  };

  // Add expense
  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  // Delete expense
  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <header className="bg-white/10 backdrop-blur-md p-6 text-center border-b border-white/20">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">💰 Expense Splitter</h1>
      </header>

      <main className="p-8">
        <div className="max-w-7xl mx-auto flex gap-8" style={{ minWidth: '1000px' }}>
          <div style={{ width: '50%', minWidth: '500px' }}>
            <PeopleManager 
              people={people}
              onAdd={addPerson}
              onRemove={removePerson}
            />
            <ExpenseForm 
              people={people}
              onAddExpense={addExpense} 
            />
          </div>

          <div style={{ width: '50%', minWidth: '500px' }}>
            <BalanceView 
              people={people}
              expenses={expenses}
            />
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
