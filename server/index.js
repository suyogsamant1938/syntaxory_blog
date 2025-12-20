import express from "express";
import cors from "cors";
import supabase from "./config/supabase.js";
import webhookHandler from './controllers/webhookController.js';
import blogRoutes from "./routes/blogRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";

const app = express();

// Enable CORS
app.use(cors());

// Stripe webhook endpoint requires the raw body for signature verification
// Register it BEFORE the JSON body parser so the raw body is preserved
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// JSON parsing for all other routes
app.use(express.json());

// Mount blog routes
app.use('/blogs', blogRoutes);

app.use("/stripe", stripeRoutes);

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


// Start server on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
