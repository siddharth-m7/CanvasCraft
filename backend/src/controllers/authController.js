// controllers/authController.js
const supabase = require('../utils/supabase');

// Sign up with email and password
const signupEmail = async (req, res) => {
  const { email, password, firstName = '', lastName = '' } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

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
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'User created successfully',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Log in with email and password
const loginEmail = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Start Google OAuth
const googleOAuth = async (_req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.CLIENT_URL}/auth/success`,
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Send URL to client to redirect
    return res.json({
      message: 'Google OAuth initiated',
      url: data.url,
    });
  } catch (err) {
    console.error('Google OAuth error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Handle OAuth callback (server exchange)
const googleOAuthCallback = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'Authorization code not provided' });
  }

  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Redirect to frontend with tokens
    return res.redirect(`${process.env.CLIENT_URL}/auth/success?access_token=${data.session.access_token}&refresh_token=${data.session.refresh_token}`);
  } catch (err) {
    console.error('OAuth callback error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Sign out
const signout = async (_req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Signout error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      message: 'Token refreshed successfully',
      session: data.session,
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  signupEmail,
  loginEmail,
  googleOAuth,
  googleOAuthCallback,
  signout,
  refreshToken,
};
