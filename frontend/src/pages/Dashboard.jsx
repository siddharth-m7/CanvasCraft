import React, { useEffect } from 'react';
import useAuthStore from '../stores/authStore';

const Dashboard = () => {
  const { user, getCurrentUser } = useAuthStore();

  useEffect(() => {
    if (!user) getCurrentUser();
  }, [user, getCurrentUser]);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-gray-600 mt-2">
        {user ? `Welcome, ${user.user_metadata?.full_name || user.email}` : 'Loading…'}
      </p>
    </div>
  );
};

export default Dashboard;
