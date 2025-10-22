const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create Supabase client with service role key for admin operations
let supabase = null;
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✅ Supabase client initialized');
} else {
  console.warn('⚠️ Missing Supabase environment variables');
  console.warn('Required: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  console.warn('Server will start but password reset will not work until variables are set');
}

// Password reset endpoint
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    
    console.log('🔐 Password Reset API: Request received');
    console.log('🔐 Email:', email);
    console.log('🔐 Token:', token);
    
    if (!email || !token || !newPassword) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, token, newPassword' 
      });
    }
    
    if (!supabase) {
      return res.status(500).json({ 
        error: 'Server configuration error: Supabase not initialized. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.' 
      });
    }
    
    // Find the user by email using getUserByEmail
    console.log('🔐 Finding user by email...');
    const { data: user, error: findError } = await supabase.auth.admin.getUserByEmail(email);
    
    if (findError) {
      console.error('❌ Error finding user:', findError);
      return res.status(500).json({ error: 'Failed to find user' });
    }
    
    if (!user || !user.user) {
      console.error('❌ User not found:', email);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ User found:', user.user.id);
    
    // In a real app, you would verify the token against your database
    // For now, we'll accept any token and update the password
    
    // Update the user's password using admin API
    console.log('🔐 Updating password...');
    const { data, error } = await supabase.auth.admin.updateUserById(
      user.user.id,
      { 
        password: newPassword,
        email_confirmed_at: new Date().toISOString()  // Confirm email after password reset
      }
    );
    
    if (error) {
      console.error('❌ Error updating password:', error);
      return res.status(500).json({ error: 'Failed to update password' });
    }
    
    console.log('✅ Password updated successfully');
    
    res.json({ 
      success: true, 
      message: 'Password updated successfully' 
    });
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Password Reset API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Password Reset API running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Reset endpoint: http://localhost:${PORT}/api/auth/reset-password`);
});

module.exports = app;
