// controllers/authController.js
const supabase = require('../utils/supabase');
const { z } = require('zod');

const emailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().max(50).optional().default(''),
  lastName: z.string().max(50).optional().default(''),
});

const cookieOpts = (hours) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: hours * 60 * 60 * 1000,
  path: '/', // explicit
});

// Sign up with email and password
const signupEmail = async (req, res) => {
  // ✅ validate inputs
  const parsed = emailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const { email, password, firstName, lastName } = parsed.data;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`.trim(),
        },
        // Optional: set email redirect if you use email confirmations
      },
    });
    if (error) return res.status(400).json({ error: error.message });

    // ⚠️ Supabase may not create a session until email confirmed; if a session exists, set cookies
    if (data.session) {
      res.cookie('sb-access-token', data.session.access_token, cookieOpts(1));
      res.cookie('sb-refresh-token', data.session.refresh_token, cookieOpts(24 * 30));
    }

    // ✅ never send tokens back; return minimal info
    return res.status(201).json({
      message: 'User created successfully',
      user: { id: data.user?.id, email: data.user?.email },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Log in with email and password
const loginEmail = async (req, res) => {
  const parsed = emailSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  const { email, password } = parsed.data;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ error: error.message });

    // ✅ set cookies, don’t return tokens
    res.cookie('sb-access-token', data.session.access_token, cookieOpts(1));
    res.cookie('sb-refresh-token', data.session.refresh_token, cookieOpts(24 * 30));

    return res.json({ message: 'Login successful', user: { id: data.user.id, email: data.user.email } });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




// Sign out
const signout = async (_req, res) => {
  try {
    // Supabase signOut invalidates server-side; we also clear cookies
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });

    res.clearCookie('sb-access-token', { path: '/' });
    res.clearCookie('sb-refresh-token', { path: '/' });

    return res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Signout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["sb-refresh-token"];
    if (!refreshToken) return res.status(401).json({ error: "No refresh token provided" });

    const { data, error } = await supabase.auth.setSession({ refresh_token: refreshToken });
    if (error || !data?.session) return res.status(401).json({ error: "Failed to refresh session" });

    res.cookie('sb-access-token', data.session.access_token, cookieOpts(1));
    res.cookie('sb-refresh-token', data.session.refresh_token, cookieOpts(24 * 30));

    // Optionally include a minimal user snapshot to reduce extra call
    return res.json({ message: "Session refreshed" });
  } catch (err) {
    console.error("Auth /refresh error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getLoggedInUser = async (req, res) => {
  try {
    const accessToken = req.cookies["sb-access-token"];
    
    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      // Clear invalid cookies
      res.clearCookie('sb-access-token', { path: '/' });
      res.clearCookie('sb-refresh-token', { path: '/' });
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    return res.json({ user });
  } catch (err) {
    console.error("Auth /user error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  signupEmail,
  loginEmail,
  signout,
  refreshToken,
  getLoggedInUser
};
