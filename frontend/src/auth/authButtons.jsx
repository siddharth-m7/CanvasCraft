import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AuthButtons() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Check your email for confirmation link if signup requires it.');
  }

  async function signIn(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div>
      <form onSubmit={signIn}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
        <button type="submit">Sign In</button>
      </form>

      <button onClick={signUp}>Sign Up</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
