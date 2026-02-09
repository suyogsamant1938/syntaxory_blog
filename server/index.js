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
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
app.use(limiter);

// Enable CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://your-project-name.vercel.app', // Fallback or additional domains
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  })
);

// Stripe webhook endpoint requires the raw body for signature verification
// Register it BEFORE the JSON body parser so the raw body is preserved
app.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

// JSON parsing for all other routes
app.use(express.json());

// Mount routes under /api
app.use('/api/blogs', blogRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/ai", aiBlogRoutes);
app.use("/api/images", imageRoutes);

// Add a health check route at /api/health
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Test Supabase connection by fetching 1 blog
app.get('/api/db-health', async (req, res) => {
  try {
    console.log('Testing DB connection...');
    const { data, error } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('DB Health Error:', error);
      return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json({ 
      message: 'Supabase connection successful', 
      data 
    });
  } catch (err) {
    console.error('DB Health Exception:', err);
    res.status(500).json({ error: err.message });
  }
});

// Catch-all for debugging unmatched /api routes
app.use('/api/(.*)', (req, res) => {
  console.log(`404 at: ${req.originalUrl}`);
  res.status(404).json({ 
    error: 'Route not found', 
    path: req.originalUrl,
    message: 'Check your server routes and vercel.json configuration'
  });
});

app.use(errorHandler);



// Start server on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
