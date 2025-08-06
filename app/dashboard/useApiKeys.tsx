import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.ts';

export interface ApiKey {
  id: string;
  created_at: string;
  name: string;
  value: string;
  usage: number;
}

const TYPES = ['dev', 'prod'];

export default function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<{[id: string]: boolean}>({});
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string|null>(null);
  const [deleteId, setDeleteId] = useState<string|null>(null);
  const [form, setForm] = useState({ name: '', value: '' });
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [connectionMessage, setConnectionMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationColor, setNotificationColor] = useState<string>('bg-green-500');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Fetch all api_keys from Supabase
  const fetchApiKeys = async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase.from('api_keys').select('*');
    if (error) setError(error.message);
    else setApiKeys(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchApiKeys();
    // Connection check
    const checkConnection = async () => {
      setConnectionStatus('loading');
      const { error } = await supabase.from('api_keys').select('*').limit(1);
      if (error) {
        setConnectionStatus('error');
        setConnectionMessage(error.message);
      } else {
        setConnectionStatus('success');
        setConnectionMessage('Connection successful!');
      }
    };
    checkConnection();
  }, []);

  // CREATE
  const handleCreate = async () => {
    setLoading(true);
    setError('');
    const newKey = {
      name: form.name || 'new-key',
      value: form.value || '***************',
      usage: 0,
    };
    const { error } = await supabase.from('api_keys').insert([newKey]);
    if (error) setError(error.message);
    else {
      setNotification('API key added successfully.');
      setNotificationColor('bg-green-500');
    }
    setForm({ name: '', value: '' });
    setCreating(false);
    await fetchApiKeys();
    setLoading(false);
  };

  // UPDATE
  const handleEdit = async (id: string) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.from('api_keys').update({ name: form.name, value: form.value }).eq('id', id);
    if (error) setError(error.message);
    setEditingId(null);
    setForm({ name: '', value: '' });
    await fetchApiKeys();
    setLoading(false);
  };

  // DELETE
  const handleDelete = async (id: string) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (error) setError(error.message);
    else {
      setNotification('API key deleted successfully.');
      setNotificationColor('bg-red-500');
    }
    setDeleteId(null);
    await fetchApiKeys();
    setLoading(false);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Add a function to sort apiKeys by name
  const sortedApiKeys = [...apiKeys].sort((a, b) => {
    if (a.name && b.name) {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  return {
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
  };
}