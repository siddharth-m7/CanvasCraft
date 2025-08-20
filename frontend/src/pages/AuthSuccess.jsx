// src/pages/AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

export default function AuthSuccess() {
  const navigate = useNavigate();
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    // Re-run initialize => it will call /api/auth/me using cookies
    (async () => {
      try {
        await initialize();
      } finally {
        navigate('/', { replace: true });
      }
    })();
  }, [initialize, navigate]);

  return null;
}
