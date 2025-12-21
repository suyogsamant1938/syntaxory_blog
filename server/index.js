import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import webhookHandler from './controllers/webhookController.js';
import blogRoutes from "./routes/blogRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import aiBlogRoutes from "./routes/aiBlogRoutes.js";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Stripe webhook endpoint requires the raw body for signature verification
// Register it BEFORE the JSON body parser so the raw body is preserved
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// JSON parsing for all other routes
app.use(express.json());

// Mount blog routes
app.use('/blogs', blogRoutes);

app.use("/stripe", stripeRoutes);

app.use("/likes", likeRoutes);

app.use("/comments", commentRoutes);

app.use("/ai", aiBlogRoutes);


app.use(errorHandler);

// Mount image routes
app.use("/images", imageRoutes);

// Add a health check route at /health
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Test Supabase connection by fetching 1 blog
app.get('/db-health', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
    
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json({ 
      message: 'Supabase connection successful', 
      data 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Temporary endpoint to upgrade user to ADMIN
app.post('/setup-admin', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // 1. Get user ID from profiles
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (profileError) {
      return res.status(404).json({ error: 'User not found. Please sign up first.' });
    }

    // 2. Update role to ADMIN
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: 'ADMIN' })
      .eq('id', profile.id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({ message: 'User upgraded to ADMIN successfully', user: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
