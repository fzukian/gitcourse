'use client';

import React from 'react';
import Sidebar from './Sidebar';
import useApiKeys from './useApiKeys';
import ApiKeyTable from './ApiKeyTable';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import NotificationBanner from './NotificationBanner';

export default function Dashboard() {
  const {
    apiKeys,
    showKey,
    setShowKey,
    creating,
    setCreating,
    editingId,
    setEditingId,
    deleteId,
    setDeleteId,
    form,
    setForm,
    connectionStatus,
    connectionMessage,
    loading,
    error,
    notification,
    notificationColor,
    sortOrder,
    setSortOrder,
    sidebarVisible,
    setSidebarVisible,
    handleCreate,
    handleEdit,
    handleDelete,
    sortedApiKeys
  } = useApiKeys();

  return (
    <div className="w-full min-h-[60vh] flex bg-[#f9fbfd]">
      {sidebarVisible && <Sidebar />}
      <div className="flex-1 flex flex-col items-center">
        <button
          className="self-start m-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-gray-700 font-semibold"
          onClick={() => setSidebarVisible((v: boolean) => !v)}
        >
          {sidebarVisible ? 'Hide Sidebar' : 'Show Sidebar'}
        </button>
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">API Keys</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full font-semibold transition-colors duration-200 w-8 h-8 flex items-center justify-center"
              onClick={() => { setCreating(true); setForm({ name: '', value: '' }); }}
              aria-label="Add API Key"
            >
              +
            </button>
          </div>
          <div className="mb-4">
            <div className="p-3 rounded-lg" style={{ background: connectionStatus === 'success' ? '#d1fae5' : connectionStatus === 'error' ? '#fee2e2' : '#f3f4f6' }}>
              <span className="font-semibold">Supabase connection status:</span>
              {connectionStatus === 'loading' && <span className="ml-2">Checking...</span>}
              {connectionStatus === 'success' && <span className="ml-2 text-green-700">{connectionMessage}</span>}
              {connectionStatus === 'error' && <span className="ml-2 text-red-700">Error: {connectionMessage}</span>}
            </div>
          </div>
          <NotificationBanner message={notification} color={notificationColor} />
          <ApiKeyTable
            creating={creating}
            editingId={editingId}
            deleteId={deleteId}
            form={form}
            setForm={setForm}
            setCreating={setCreating}
            setEditingId={setEditingId}
            setDeleteId={setDeleteId}
            setShowKey={setShowKey}
            showKey={showKey}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            sortedApiKeys={sortedApiKeys}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <DeleteConfirmationModal
            open={!!deleteId}
            onDelete={() => handleDelete(deleteId!)}
            onCancel={() => setDeleteId(null)}
          />
        </div>
      </div>
    </div>
  );
}