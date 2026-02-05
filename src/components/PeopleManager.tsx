import { useState } from "react";

interface Props {
  people: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

function PeopleManager({ people, onAdd, onRemove }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = input.trim();
    if (!name) return;

    onAdd(name);
    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg transition-all hover:-translate-y-0.5">
      {/* Title */}
      <h2 className="text-gray-800 mb-5 text-2xl font-semibold border-b border-gray-200 pb-3 flex items-center gap-2">
        👥 Manage People
      </h2>

      {/* Form */}
      <form className="flex gap-3 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Enter person's name"
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 h-10 px-4 border border-gray-300 rounded-lg text-base transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="h-10 px-5 bg-indigo-600 text-white rounded-lg text-base font-medium transition hover:bg-indigo-700 active:scale-[0.98]"
        >
          Add Person
        </button>
      </form>

      {/* Members */}
      <div>
        <h3 className="text-gray-500 mb-3 text-sm font-medium">
          Current Members ({people.length})
        </h3>

        {people.length === 0 ? (
          <p className="text-center text-gray-400 py-8 italic">
            No people added yet
          </p>
        ) : (
          <ul className="space-y-3">
            {people.map((person) => (
              <li
                key={person}
                className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-800">{person}</span>

                <button
                  onClick={() => onRemove(person)}
                  className="flex items-center justify-center w-8 h-8 text-red-500 rounded-md hover:bg-red-100 transition"
                  aria-label={`Remove ${person}`}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Warning */}
      {people.length < 2 && (
        <p className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mt-6 text-sm flex items-center gap-2">
          ⚠️ Add at least 2 people to start tracking expenses
        </p>
      )}
    </div>
  );
}

export default PeopleManager;