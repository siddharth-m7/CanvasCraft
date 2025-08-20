import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const access = params.get('access_token');
    const refresh = params.get('refresh_token');

    if (access && refresh) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      navigate('/', { replace: true });
      return;
    }

    // Fallback: if no tokens in query, try Supabase client to fetch the session
    // This covers the flow where Supabase handled the exchange client-side.
    const tryFetchSession = async () => {
      try {
        // Lazy import to avoid build issues if path differs
        const { supabase } = await import('../utils/supabase');
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          localStorage.setItem('access_token', session.access_token);
          localStorage.setItem('refresh_token', session.refresh_token);
          navigate('/', { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      } catch {
        navigate('/login', { replace: true });
      }
    };

    tryFetchSession();
  }, [params, navigate]);

  return null;
}
