import React from 'react';
import { ApiKey } from './useApiKeys';

interface ApiKeyTableProps {
  creating: boolean;
  editingId: string | null;
  deleteId: string | null;
  form: { name: string; value: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; value: string }>>;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  setShowKey: React.Dispatch<React.SetStateAction<{ [id: string]: boolean }>>;
  showKey: { [id: string]: boolean };
  handleCreate: () => void;
  handleEdit: (id: string) => void;
  sortedApiKeys: ApiKey[];
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

const ApiKeyTable: React.FC<ApiKeyTableProps> = ({
  creating,
  editingId,
  deleteId,
  form,
  setForm,
  setCreating,
  setEditingId,
  setDeleteId,
  setShowKey,
  showKey,
  handleCreate,
  handleEdit,
  sortedApiKeys,
  sortOrder,
  setSortOrder,
}) => (
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200">
        <th className="text-xs font-bold text-gray-500 uppercase tracking-wider text-left pb-2 pl-2 cursor-pointer select-none" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          NAME {sortOrder === 'asc' ? '▲' : '▼'}
        </th>
        <th className="text-xs font-bold text-gray-500 uppercase tracking-wider text-left pb-2">USAGE</th>
        <th className="text-xs font-bold text-gray-500 uppercase tracking-wider text-left pb-2">KEY</th>
        <th className="text-xs font-bold text-gray-500 uppercase tracking-wider text-center pb-2 pr-2">OPTIONS</th>
      </tr>
    </thead>
    <tbody>
      {creating && (
        <tr className="border-b border-gray-200 bg-[#f5f8fa]">
          <td className="py-4 pl-2">
            <input
              className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700"
              placeholder="Key name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </td>
          <td className="py-4 text-gray-700 text-lg align-middle">0</td>
          <td className="py-4">
            <span className="bg-[#f5f8fa] px-6 py-2 rounded-xl font-bold tracking-wide text-lg text-gray-700 border border-gray-200 font-mono select-all">
              {form.value}
            </span>
          </td>
          <td className="py-4 pr-2 flex gap-4 justify-center">
            <button className="text-blue-600 font-bold" onClick={handleCreate}>Save</button>
            <button className="text-gray-400 font-bold" onClick={() => setCreating(false)}>Cancel</button>
          </td>
        </tr>
      )}
      {sortedApiKeys.map((apiKey) => (
        editingId === apiKey.id ? (
          <tr key={apiKey.id} className="border-b border-gray-200 bg-[#f5f8fa]">
            <td className="py-4 pl-2">
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 w-full text-gray-700"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </td>
            <td className="py-4 text-gray-700 text-lg align-middle">{apiKey.usage}</td>
            <td className="py-4">
              <span className="bg-[#f5f8fa] px-6 py-2 rounded-xl font-bold tracking-wide text-lg text-gray-700 border border-gray-200 font-mono select-all">
                {apiKey.value}
              </span>
            </td>
            <td className="py-4 pr-2 flex gap-4 justify-center">
              <button className="text-blue-600 font-bold" onClick={() => handleEdit(apiKey.id)}>Save</button>
              <button className="text-gray-400 font-bold" onClick={() => setEditingId(null)}>Cancel</button>
            </td>
          </tr>
        ) : (
          <tr key={apiKey.id} className="border-b last:border-b-0 border-gray-200">
            <td className="py-6 pl-2 text-gray-700 font-medium text-lg align-middle">{apiKey.name}</td>
            <td className="py-6 text-gray-700 text-lg align-middle">{apiKey.usage}</td>
            <td className="py-4">
              <div className="flex items-center">
                <span className="bg-[#f5f8fa] px-6 py-2 rounded-xl font-bold tracking-wide text-lg text-gray-700 border border-gray-200 font-mono select-all">
                  {showKey[apiKey.id] ? apiKey.value : (apiKey.value.slice(0, 9) + '*'.repeat(27))}
                </span>
              </div>
            </td>
            <td className="py-4 pr-2">
              <div className="flex items-center justify-center gap-6">
                <button onClick={() => setShowKey(prev => ({...prev, [apiKey.id]: !prev[apiKey.id]}))} className="hover:text-blue-600" aria-label="Show/Hide Key">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                <button onClick={() => navigator.clipboard.writeText(apiKey.value)} className="hover:text-blue-600" aria-label="Copy Key">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                <button onClick={() => { setEditingId(apiKey.id); setForm({ name: apiKey.name, value: apiKey.value }); }} className="hover:text-blue-600" aria-label="Edit Key">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.1 2.1 0 1 1 2.97 2.97L7.5 18.79l-4 1 1-4 13.362-13.303z" />
                  </svg>
                </button>
                <button onClick={() => setDeleteId(apiKey.id)} className="hover:text-blue-600" aria-label="Delete Key">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v1.5M4.5 7.5h15m-1.5 0v9.75A2.25 2.25 0 0 1 15.75 19.5h-7.5A2.25 2.25 0 0 1 6 17.25V7.5h12z" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        )
      ))}
    </tbody>
  </table>
);

export default ApiKeyTable;